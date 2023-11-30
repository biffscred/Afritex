<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
// Importez d'autres classes nécessaires...

class AccountActivationController extends AbstractController
{
    #[Route('/activate-account/{token}', name: 'account_activation')]
    public function activateAccount(string $token, UserRepository $userRepository): Response
    {
        $user = $userRepository->findOneBy(['activationToken' => $token]);

        if (!$user) {
            // Gérer le cas où le token n'est pas trouvé
            return $this->render('activation/invalid_token.html.twig');
        }

        // Activer le compte et effacer le token
        $user->setIsActive(true);
        $user->setActivationToken(null);
        // Enregistrez les changements dans la base de données...

        // Afficher une confirmation ou rediriger vers la page de connexion
        return $this->render('activation/success.html.twig');
    }
}
