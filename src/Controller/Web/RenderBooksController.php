<?php

namespace App\Controller\Web;

use App\Extesion\DataExtension;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class RenderBookController
 * This controller is created for rendering the page with the list of books.
 * @package App\Controller\Web
 */
class RenderBooksController extends AbstractController
{
    public const PAGE = 'common.html.twig';
    public const PAGE_COMPONENT = '/components/books.html.twig';

    /**
     * @Route("/books")
     */
    public function RenderBookPage(): Response
    {
        $books = DataExtension::getBooksList();
        $authorsCount= count($books);
        return $this->render(self::PAGE,['books'=>$books,'elementCount'=>$authorsCount,'elementsName'=>'books', 'innerElement'=>self::PAGE_COMPONENT]);
    }

    /**
     * @Route("/get-books-by-author/{authorId}")
     * @param $authorId
     * @return Response
     */
    public function getBooksByAuthorIdAsView($authorId): Response
    {
        $books = DataExtension::getBooksByAuthorId($authorId);
        $authorsCount= count($books);
        return $this->render(self::PAGE_COMPONENT,['books'=>$books,'elementCount'=>$authorsCount,'elementsName'=>'books']);

    }
}