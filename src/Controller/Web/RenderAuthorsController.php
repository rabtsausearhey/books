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
    public const DEFAULT_COUNT_ON_PAGE = 10;
    public const DEFAULT_CURRENT_PAGE = 1;

    /**
     * Use this method for render page with authors
     * @Route("/authors/{countOnPage}/{currentPage}")
     * @param int $countOnPage
     * @param int $currentPage
     * @return Response
     */
    public function RenderAuthorsPage($countOnPage = self::DEFAULT_COUNT_ON_PAGE, $currentPage = self::DEFAULT_CURRENT_PAGE): Response
    {
        $authorsData = DataExtension::getAllAuthors();
        $elements = [];
        for ($i = 0;$i<10;$i++){
            $author = $authorsData[$i]??null;
            if($author){
                $elements[]=$author;
            }
        }
        $authorsCount = count($authorsData);
        $pageCount = (int)ceil($authorsCount / $countOnPage);
        $parameters = [ 'elements' => $elements , 'elementsCount' => $authorsCount , 'elementsName' => 'authors' ,'pageCount'=>$pageCount,'currentPage'=>$currentPage, 'innerElement' => self::PAGE_COMPONENT ];
        return $this->render(self::PAGE , $parameters);
    }
}