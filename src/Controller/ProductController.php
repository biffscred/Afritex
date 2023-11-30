<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;

#[Route('/product')]
class ProductController extends AbstractController
{
    #[Route('/', name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $context = [AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => fn($object) => $object->getId()];
        $json = $serializer->serialize($products, 'json', $context);

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/new', name: 'app_product_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($product);
            $entityManager->flush();

            return new JsonResponse($serializer->serialize($product, 'json'), Response::HTTP_CREATED, [], true);
        }

        return new JsonResponse(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product, SerializerInterface $serializer): JsonResponse
    {
        $context = [AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => fn($object) => $object->getId()];
        return new JsonResponse($serializer->serialize($product, 'json', $context), 200, [], true);
    }

    #[Route('/{id}/edit', name: 'app_product_edit', methods: ['POST'])]
    public function edit(Request $request, Product $product, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $form = $this->createForm(ProductType::class, $product);
        $form->submit(json_decode($request->getContent(), true));

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return new JsonResponse($serializer->serialize($product, 'json'), Response::HTTP_OK, [], true);
        }

        return new JsonResponse(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Request $request, Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        if ($this->isCsrfTokenValid('delete'.$product->getId(), $request->request->get('_token'))) {
            $entityManager->remove($product);
            $entityManager->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }

        return new JsonResponse(['error' => 'Invalid CSRF token'], Response::HTTP_FORBIDDEN);
    }
}
