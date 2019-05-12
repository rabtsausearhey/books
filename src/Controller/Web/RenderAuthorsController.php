<?php


namespace App\Controller\Web;


use App\Extesion\DataExtension;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class RenderAuthorsController
 * This controller is created for rendering the page with the list of authors.
 * @package App\Controller\Web
 */
class RenderAuthorsController extends AbstractController
{
    public const PAGE = 'common.html.twig';
    public const PAGE_COMPONENT = '/components/authors.html.twig';

    /**
     * Use this method for render page with all authors
     * @Route("/authors")
     *
     */
    public function RenderAuthorsPage(): Response
    {
        $authorsData = DataExtension::getAllAuthors();
        $authorsCount = count($authorsData);
        $response =['authors'=> $authorsData, 'elementCount'=>$authorsCount, 'innerElement'=>self::PAGE_COMPONENT];
        return $this->render(self::PAGE , $response);
    }
}