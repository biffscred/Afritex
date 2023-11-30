<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class ProfileController extends AbstractController
{
    #[Route(path: '/api/user/profile', name: 'app_user_profile', methods: ['GET'])]
    public function userProfile(Security $security): JsonResponse
    {
        // Obtention de l'utilisateur connecté
        $user = $security->getUser();

        // Vérification si l'utilisateur est connecté
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        // Renvoyer les informations de l'utilisateur
        // Adaptez les champs en fonction de ce que vous souhaitez exposer
        return new JsonResponse([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            // Vous pouvez ajouter d'autres informations ici
        ]);
    }
}
