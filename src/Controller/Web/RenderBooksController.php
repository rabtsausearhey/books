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
    public const DEFAULT_COUNT_ON_PAGE = 10;
    public const DEFAULT_CURRENT_PAGE = 1;

    /**
     * Use this method for render page with books
     * @Route("/books/{countOnPage}/{currentPage}")
     * @param $countOnPage
     * @param int $currentPage
     * @return Response
     */
    public function RenderBookPage($countOnPage = self::DEFAULT_COUNT_ON_PAGE , $currentPage = self::DEFAULT_CURRENT_PAGE): Response
    {
        $booksList = DataExtension::getBooksList();
        $elements =[];
        for ($i = 0;$i<$countOnPage;$i++){
            $book = $booksList[$i]??null;
            if($book){
                $elements[]=$book;
            }
        }
        $elementsCount = count($booksList);
        $pageCount = (int)ceil($elementsCount / $countOnPage);
        $parameters =
            [
                'elements' => $elements , 'elementsCount' => $elementsCount , 'elementsName' => 'books' ,
                'pageCount' => $pageCount , 'currentPage' => $currentPage , 'innerElement' => self::PAGE_COMPONENT
            ];
        return $this->render(self::PAGE , $parameters);
    }
}