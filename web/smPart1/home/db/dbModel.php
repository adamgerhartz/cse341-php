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
            echo $row;
        }
    }

 }

?>