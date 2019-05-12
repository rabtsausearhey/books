<?php


namespace App\Controller\Api;

use Swift_Mailer;
use Swift_Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class SendMailController
 * This controller manages the sending of letters
 * @package App\Controller\Api
 */
class SendMailController extends AbstractController
{
    /**
     * This method return all books for selected author
     * @Route("/api/send-mail")
     * @param Request $request
     * @param Swift_Mailer $mailer
     * @return JsonResponse
     */
    public function sendMail(Request $request , Swift_Mailer $mailer): JsonResponse
    {
        $parameters = json_decode($request->getContent() , true);
        $email = $parameters['email'];
        $name = $parameters['name'];
        $date = $parameters['date'];
        $bookName = $parameters['bookName'];
        $message = (new Swift_Message('Hello Email'))
            ->setFrom('bookshopprojectexemple@gmail.com')
            ->setTo($email)
            ->setBcc('rabtsevsearhey@gmail.com')
            ->setBody(
                $this->renderView(
                    'emails/confirmation.html.twig' ,
                    [ 'name' => $name , 'date' => $date , 'bookName' => $bookName ]
                ) ,
                'text/html'
            );
        $check = $mailer->send($message);

        if ($check) {
            return new JsonResponse([ 'status' => [ 'code' => 200 , 'message' => 'letter has been sent, please check email' ] ]);
        }
        return new JsonResponse([ 'status' => [ 'code' => 500 , 'message' => 'email not been sent' ] ]);
    }
}