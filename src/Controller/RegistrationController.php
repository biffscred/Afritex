<?php

namespace App\Controller;

use App\Entity\User;
use App\Security\EmailVerifier;
use Symfony\Component\Mime\Address;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
    private EmailVerifier $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    #[Route('/SignUp', name: 'api_register', methods: ['POST'])]
    public function apiRegister(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setEmail($data['email']);
       
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $data['password']
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();

        // Envoi de l'email de confirmation

        
        $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
            (new TemplatedEmail())
                ->from(new Address('contactafritex@gmail.com', 'Afritex'))
                ->to($user->getEmail())
                ->subject('Veuillez confirmez votre email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );
        

        return $this->json(['message' => 'Utilisateur créé avec succès']);
    }

    // #[Route('/AccountActivation', name: 'api_verify_email')]
    // public function verifyUserEmail(Request $request, TranslatorInterface $translator): Response
    // {
    //     $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

    //     try {
    //         $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
    //         return $this->json(['status' => 'success', 'message' => 'Email verified successfully!']);
    //     } catch (VerifyEmailExceptionInterface $exception) {
    //         return $this->json(['status' => 'error', 'message' => 'Verification failed!'], Response::HTTP_BAD_REQUEST);
    //     }}
}
