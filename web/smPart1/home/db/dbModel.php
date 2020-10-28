<?php
session_start();

$db = require('../db/config.php');

class DbModel {

    function retrieveFirstName($id) {
        echo 'Adam';
        // global $db;
        // $stmt = $db->prepare('SELECT first_name, last_name FROM public.user WHERE user_id=:id');
        // $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        // $result = $stmt->execute();

        // if ($result) {
        //     $row = $stmt->fetch();
        //     $firstName = $row['first_name'];
        //     $lastName = $row['last-name'];
        //     echo $firstName;
        //     echo $lastName;
        // }
    }

 }

?>