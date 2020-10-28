<?php
session_start();

$db = require('../db/config.php');

class DbModel {

    function retrieveFirstName($id) {
        $stmt = $db->prepare('SELECT first_name FROM public.user WHERE user_id=:id');
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $result = $stmt->execute();

        // if ($result) {
        //     $row = $stmt->fetch();
        //     $firstName = $row['first_name'];
        //     echo $firstName;
        // }
    }

 }

?>