<?php

namespace App\Controller;

use App\Entity\Order;

use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/order')]
class OrderController extends AbstractController
{
    // Lister les commandes de l'utilisateur connecté
    #[Route('/user', name: 'user_orders', methods: ['GET'])]
    public function userOrders(UserInterface $user, OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $orders = $orderRepository->findBy(['user' => $user]);
        $json = $serializer->serialize($orders, 'json');

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    // Créer une nouvelle commande
    #[Route('/new', name: 'create_order', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $order = $serializer->deserialize($request->getContent(), Order::class, 'json');

        // Ajoutez ici la logique pour valider et traiter la commande
        $entityManager->persist($order);
        $entityManager->flush();

        return new JsonResponse($serializer->serialize($order, 'json'), Response::HTTP_CREATED, [], true);
    }

    // Afficher les détails d'une commande spécifique
    #[Route('/{id}', name: 'show_order', methods: ['GET'])]
    public function show(Order $order, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($order, 'json');
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    // Mettre à jour une commande (à implémenter selon vos besoins)
    #[Route('/{id}/edit', name: 'edit_order', methods: ['POST'])]
    public function edit(Request $request, Order $order, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        // Logique de mise à jour de la commande
        // ...

        $entityManager->flush();
        return new JsonResponse($serializer->serialize($order, 'json'), Response::HTTP_OK, [], true);
    }

    // Annuler ou supprimer une commande (à implémenter selon vos besoins)
    #[Route('/{id}/delete', name: 'delete_order', methods: ['DELETE'])]
    public function delete(Order $order, EntityManagerInterface $entityManager): JsonResponse
    {
        // Logique de suppression de la commande
        // ...

        $entityManager->remove($order);
        $entityManager->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
