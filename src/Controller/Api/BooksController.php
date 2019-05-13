<?php

namespace App\Controller\Api;

use App\Extesion\DataExtension;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BooksController
 * This controller created for working with books
 * @package App\Controller\Api
 */
class BooksController extends AbstractController
{
    /**
     * This method return all books for selected author
     * @Route("/api/get-books-by-author/{authorId}")
     * @param $authorId
     * @return JsonResponse
     */
    public function getBooksByAuthorId($authorId): JsonResponse
    {
       try{
           $books = DataExtension::getBooksByAuthorId($authorId);
           if ($books) {
               $response = [
                   'status' => [ 'code' => 200 , 'message' => 'success' ] , 'elements' => $books
               ];
           } else {
               $response = [ 'status' => [ 'code' => 404 , 'message' => 'illegal author id' ] ];
           }
           return new JsonResponse($response);
       }catch (Exception $e){
           return new JsonResponse([ 'status' => [ 'code' => 500 , 'message' => $e->getMessage() ] ]);
       }
    }
}