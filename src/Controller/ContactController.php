<?php

namespace App\Controller;

use App\Form\ContactType;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function index(Request $request , MailerInterface $mailer): Response
    {
       $form= $this->createForm(ContactType::class);
       $form->handleRequest($request);
       if ($form->isSubmitted()&& $form->isValid()){

       $adress=$form->get('email')->getData();
       $subject=$form->get('subject')->getData();
       $content=$form->get('content')->getData();

       $email = (new Email())
            ->from($adress)
            ->to('contactafritex@fr')
       
            ->subject($subject)
            ->text('Sending emails is fun again!');

        $mailer->send($email);
        

        return $this->redirectToRoute('app_success');

       }
        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
            'form'=>$form
        ]);
    }
    #[Route('/contact/success', name: 'app_success')]
    public function success(): Response
    {
       
        {
            return $this->render('success/index.html.twig', [
                'controller_name' => 'SuccessController',
            ]);
        }
    }
}
