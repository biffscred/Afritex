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

   

    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product, SerializerInterface $serializer): JsonResponse
    {
        $context = [AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => fn($object) => $object->getId()];
        return new JsonResponse($serializer->serialize($product, 'json', $context), 200, [], true);
    }

   
   
}
