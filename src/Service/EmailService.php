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

    public function sendEmailConfirmation($subject, $to, $message)
    {
        $email = (new Email())
            ->from('contactafritex@gmail.com')
            ->to($to)
            ->subject($subject)
            ->text($message);

        $this->mailer->send($email);
    }
}
