<?php
session_start();

$db = require('../db/config.php');

class DbModel {

    function retrieveFirstName($id) {
        global $db;
        $stmt = $db->prepare('SELECT first_name, last_name, photo_uri, about_me FROM public.user WHERE user_id=:id');
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $result = $stmt->execute();

        if ($result) {
            $row = $stmt->fetch();
            $data = [];
            $firstName = $row['first_name'];
            $lastName = $row['last_name'];
            $photoUri = $row['photo_uri'];
            $about_me = $row['about_me'];
            array_push($data, $firstName);
            array_push($data, $lastName);
            array_push($data, $photoUri);
            array_push($data, $about_me);
            echo $data;
        }
    }

 }

?>