<?php


namespace App\Controller\Web;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class RenderHomeController
 * This controller serves to display the home page.
 * @package App\Controller\Web
 */
class RenderHomeController extends AbstractController
{
    public const PAGE = 'home.html.twig';

    /**
     * Render home page
     * @Route("/")
     */
    public function RenderHomePage(): Response
    {
        return $this->render(self::PAGE);
    }
}