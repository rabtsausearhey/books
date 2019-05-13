<?php

namespace App\Controller\Api;

use App\Controller\Web\RenderAuthorsController;
use App\Controller\Web\RenderBooksController;
use App\Extesion\DataExtension;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ChangePageController
 * Class created to work with content pages
 * @package App\Controller\Api
 */
class ChangePageController extends AbstractController
{

    /**
     * @Route("/api/change-page/{name}/{countOnPage}/{currentPage}")
     * @param $name
     * @param $countOnPage
     * @param $currentPage
     * @return JsonResponse
     */
    public function getPage($name , $countOnPage = null , $currentPage = 1): JsonResponse
    {
        try {
            if ($name === 'authors') {
                $elementList = DataExtension::getAllAuthors();
                $page = RenderAuthorsController::PAGE_COMPONENT;
            } else if ($name === 'books') {
                $elementList = DataExtension::getBooksList();
                $page = RenderBooksController::PAGE_COMPONENT;
            } else if (strpos($name , 'books of') === 0) {
                $authorName = str_replace('books of ' , '' , $name);
                $elementList = DataExtension::getBooksByAuthorName($authorName);
                $page = RenderBooksController::PAGE_COMPONENT;
            } else {
                return new JsonResponse([ 'status' => [ 'code' => 404 , 'message' => 'Type not defined' ] ]);
            }
            $elementsCount = count($elementList);
            $pageCount = (int)ceil($elementsCount / $countOnPage);

            if ($currentPage > $pageCount) {
                $currentPage = $pageCount;
            }
            $i = ($currentPage - 1) * $countOnPage;
            $maxI = $i + $countOnPage;
            if ($maxI > $elementsCount) {
                $maxI = $elementsCount;
            }
            $ret = [];
            for (; $i < $maxI; $i++) {
                $ret[] = $elementList[$i];
            }
            $html = $this->renderView($page , [ 'elements' => $ret ]);
            return new JsonResponse([ 'status' => [ 'code' => 200 , 'message' => 'success' ] , 'currentPage' => $currentPage , 'html' => $html , 'pageCount' => $pageCount , 'elementsCount' => $elementsCount , 'elementsName' => $name ]);
        } catch (Exception $e) {
            return new JsonResponse([ 'status' => [ 'code' => 500 , 'message' => $e->getMessage() ] ]);
        }
    }
}