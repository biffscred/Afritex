<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, UserProviderInterface $userProvider, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        try {
            $user = $userProvider->loadUserByIdentifier($email);
        } catch (UserNotFoundException $e) {
            return new Response('Invalid credentials', Response::HTTP_UNAUTHORIZED);
        }

        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return new Response('Invalid credentials', Response::HTTP_UNAUTHORIZED);
        }

        $token = $JWTManager->create($user);

        // Créer un cookie pour le token
        $cookie = Cookie::create(
            'BEARER', 
            $token, 
            time() + 3600, // Expire après 1 heure
            '/', 
            null, 
            false, 
            true, // HttpOnly
            false,
            Cookie::SAMESITE_STRICT
        );

        // Créer une réponse et ajouter le cookie
        $response = new Response('Login successful');
        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): Response
    {
        $response = new Response('Logout successful');
        // Supprimer le cookie en définissant sa date d'expiration dans le passé
        $response->headers->clearCookie('BEARER');

        return $response;
    }
}
