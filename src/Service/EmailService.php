<?php
// src/Service/EmailService.php
namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendEmail($subject, $to, $message)
    {
        $email = (new Email())
            ->from('contactafritex@gmail.com') // Adresse e-mail Gmail configurée dans les paramètres
            ->to($to)
            ->subject($subject)
            ->text($message);

        $this->mailer->send($email);
    }
}
