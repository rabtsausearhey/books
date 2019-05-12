<?php

namespace App\Extesion;

/**
 * Class DataExtension
 * This class replaces the database
 * @package App\Extesion
 */
class DataExtension
{

    private const AUTHORS = [
        [ 'id' => 12 , 'image' => 'king.jpeg' , 'name' => 'Stephen King' ] ,
        [ 'id' => 0 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №1' ] ,
        [ 'id' => 1 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №2' ] ,
        [ 'id' => 2 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №3' ] ,
        [ 'id' => 3 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №4' ] ,
        [ 'id' => 4 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №5' ] ,
        [ 'id' => 5 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №6' ] ,

        [ 'id' => 6 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №7' ] ,
        [ 'id' => 7 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №8' ] ,
        [ 'id' => 8 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №9' ] ,
        [ 'id' => 9 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №10' ] ,
        [ 'id' => 10 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №11' ] ,
        [ 'id' => 11 , 'image' => 'lermantov.jpeg' , 'name' => 'Lermontov Mikhail Yuryevich №12' ] ,
    ];

    private const BOOKS_LIST = [
        [ 'bookId' => '32' , 'authorName' => 'Stephen King' , 'authorId' => '12' , 'name' => 'Pet cemetery' , 'image' => 'pet_cemotory.jpeg' ],
        [ 'bookId' => '0' , 'authorName' => 'Lermontov Mikhail Yuryevich №1' , 'authorId' => '0' , 'name' => '1 book for №1' , 'image' => 'images.png' ] ,
        [ 'bookId' => '1' , 'authorName' => 'Lermontov Mikhail Yuryevich №1' , 'authorId' => '0' , 'name' => '2 book for №1' , 'image' => 'images.png' ] ,
        [ 'bookId' => '2' , 'authorName' => 'Lermontov Mikhail Yuryevich №1' , 'authorId' => '0' , 'name' => '3 book for №1' , 'image' => 'images.png' ] ,
        [ 'bookId' => '3' , 'authorName' => 'Lermontov Mikhail Yuryevich №1' , 'authorId' => '0' , 'name' => '4 book for №1' , 'image' => 'images.png' ] ,
        [ 'bookId' => '4' , 'authorName' => 'Lermontov Mikhail Yuryevich №1' , 'authorId' => '0' , 'name' => '5 book for №1' , 'image' => 'images.png' ] ,
        [ 'bookId' => '5' , 'authorName' => 'Lermontov Mikhail Yuryevich №2' , 'authorId' => '1' , 'name' => '1 book for №2' , 'image' => 'images.png' ] ,
        [ 'bookId' => '6' , 'authorName' => 'Lermontov Mikhail Yuryevich №2' , 'authorId' => '1' , 'name' => '2 book for №2' , 'image' => 'images.png' ] ,
        [ 'bookId' => '7' , 'authorName' => 'Lermontov Mikhail Yuryevich №2' , 'authorId' => '1' , 'name' => '3 book for №2' , 'image' => 'images.png' ] ,
        [ 'bookId' => '8' , 'authorName' => 'Lermontov Mikhail Yuryevich №3' , 'authorId' => '2' , 'name' => '1 book for №3' , 'image' => 'images.png' ] ,
        [ 'bookId' => '9' , 'authorName' => 'Lermontov Mikhail Yuryevich №3' , 'authorId' => '2' , 'name' => '2 book for №3' , 'image' => 'images.png' ] ,
        [ 'bookId' => '10' , 'authorName' => 'Lermontov Mikhail Yuryevich №4' , 'authorId' => '3' , 'name' => '1 book for №4' , 'image' => 'images.png' ] ,
        [ 'bookId' => '11' , 'authorName' => 'Lermontov Mikhail Yuryevich №4' , 'authorId' => '3' , 'name' => '2 book for №4' , 'image' => 'images.png' ] ,
        [ 'bookId' => '12' , 'authorName' => 'Lermontov Mikhail Yuryevich №4' , 'authorId' => '3' , 'name' => '3 book for №4' , 'image' => 'images.png' ] ,
        [ 'bookId' => '13' , 'authorName' => 'Lermontov Mikhail Yuryevich №4' , 'authorId' => '3' , 'name' => '4 book for №4' , 'image' => 'images.png' ] ,
        [ 'bookId' => '14' , 'authorName' => 'Lermontov Mikhail Yuryevich №5' , 'authorId' => '4' , 'name' => '1 book for №5' , 'image' => 'images.png' ] ,
        [ 'bookId' => '15' , 'authorName' => 'Lermontov Mikhail Yuryevich №6' , 'authorId' => '5' , 'name' => '1 book for №6' , 'image' => 'images.png' ] ,

        [ 'bookId' => '16' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '1 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '17' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '2 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '18' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '3 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '19' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '4 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '20' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '5 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '21' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '6 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '22' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '7 book for №7' , 'image' => 'images.png' ] ,
        [ 'bookId' => '23' , 'authorName' => 'Lermontov Mikhail Yuryevich №7' , 'authorId' => '6' , 'name' => '8 book for №7' , 'image' => 'images.png' ] ,

        [ 'bookId' => '24' , 'authorName' => 'Lermontov Mikhail Yuryevich №8' , 'authorId' => '7' , 'name' => '1 book for №8' , 'image' => 'images.png' ] ,
        [ 'bookId' => '25' , 'authorName' => 'Lermontov Mikhail Yuryevich №8' , 'authorId' => '7' , 'name' => '2 book for №8' , 'image' => 'images.png' ] ,

        [ 'bookId' => '26' , 'authorName' => 'Lermontov Mikhail Yuryevich №9' , 'authorId' => '8' , 'name' => '1 book for №9' , 'image' => 'images.png' ] ,
        [ 'bookId' => '27' , 'authorName' => 'Lermontov Mikhail Yuryevich №9' , 'authorId' => '8' , 'name' => '2 book for №9' , 'image' => 'images.png' ] ,
        [ 'bookId' => '28' , 'authorName' => 'Lermontov Mikhail Yuryevich №9' , 'authorId' => '8' , 'name' => '3 book for №9' , 'image' => 'images.png' ] ,
        [ 'bookId' => '29' , 'authorName' => 'Lermontov Mikhail Yuryevich №10' , 'authorId' => '9' , 'name' => '1 book for №10' , 'image' => 'images.png' ] ,
        [ 'bookId' => '30' , 'authorName' => 'Lermontov Mikhail Yuryevich №11' , 'authorId' => '10' , 'name' => '1 book for №11' , 'image' => 'images.png' ] ,
        [ 'bookId' => '31' , 'authorName' => 'Lermontov Mikhail Yuryevich №12' , 'authorId' => '11' , 'name' => '1 book for №12' , 'image' => 'images.png' ],

    ];

    /**
     * Method return all authors
     * @return array
     */
    public static function getAllAuthors(): array
    {
        return self::AUTHORS;
    }

    /**
     * Method return books for selected author by authorId
     * @param $authorId string
     * @return array
     */
    public static function getBooksByAuthorId($authorId): ?array
    {
        $ret = [];
        foreach (self::BOOKS_LIST as $book) {
            if ($book['authorId'] === $authorId) {
                $ret[] = $book;
            }
        }
        return $ret ?? null;
    }

    public static function getBooksList()
    {
        return self::BOOKS_LIST;
    }
}