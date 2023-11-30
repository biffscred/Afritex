<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\CartItem;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController
{
    #[Route('/cart', name: 'cart_index')]
    public function index(): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé.');
        }

        $cart = $user->getCart(); // Supposons que votre entité User a une méthode getCart()

        return $this->render('cart/index.html.twig', [
            'cart' => $cart,
        ]);
    }

    #[Route('/cart/add/{productId}', name: 'cart_add')]
    public function add($productId, ProductRepository $productRepository): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé.');
        }

        $cart = $user->getCart();

        $product = $productRepository->find($productId);

        if (!$product) {
            throw $this->createNotFoundException('Le produit n\'existe pas.');
        }

        $cartItem = new CartItem();
        $cartItem->setProduct($product);
        $cartItem->setQuantity(1); // Fixez la quantité ou obtenez-la de la requête
        $cart->addCartItem($cartItem);

        $em = $this->getDoctrine()->getManager();
        $em->persist($cartItem);
        $em->flush();

        return $this->redirectToRoute('cart_index');
    }

    #[Route('/cart/remove/{itemId}', name: 'cart_remove')]
    public function remove($itemId): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé.');
        }

        $cart = $user->getCart();
        $cartItem = $cart->getCartItems()->filter(function(CartItem $item) use ($itemId) {
            return $item->getId() == $itemId;
        })->first();

        if ($cartItem) {
            $cart->removeCartItem($cartItem);
            $em = $this->getDoctrine()->getManager();
            $em->remove($cartItem);
            $em->flush();
        }

        return $this->redirectToRoute('cart_index');
    }

    #[Route('/cart/clear', name: 'cart_clear')]
    public function clear(): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé.');
        }

        $cart = $user->getCart();

        foreach ($cart->getCartItems() as $item) {
            $cart->removeCartItem($item);
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->redirectToRoute('cart_index');
    }
}
