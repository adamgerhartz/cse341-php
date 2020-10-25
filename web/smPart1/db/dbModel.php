<?php
session_start();

$db = require('config.php');

class DbModel {

    function queryUsername($username) {
      	global $db;
      	$stmt = $db->prepare('SELECT username FROM public.user WHERE username=:un');
	    $stmt->bindValue(':un', $username, PDO::PARAM_STR);
	    $stmt->execute();
	    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	    if (count($rows) === 1) {
	    	print_r('true');
	    } else {
	    	print_r('false');
	    }
	    
    }

    function queryPassword($password, $username) {
    	global $db;
      	$stmt = $db->prepare('SELECT username, password FROM public.user WHERE username=:un AND password=:pw');
	    $stmt->bindValue(':un', $username, PDO::PARAM_STR);
	    $stmt->bindValue(':pw', $password, PDO::PARAM_STR);
	    $stmt->execute();
	    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	    if (count($rows) === 1) {
	    	print_r('true');
	    } else {
	    	print_r('false');
	    }
    }

    function addRecord($username, $password, $email, $first_nm, $last_nm) {
    	global $db;
    	$stmt = $db->prepare("INSERT INTO public.user (username, password, email_address, first_name, last_name, creation_date, last_update_date) VALUES (:username, :password, :email_address, :firstname, :lastname, NOW(), NOW());");
    	$stmt->bindValue(':username', $username, PDO::PARAM_STR);
    	$stmt->bindValue(':password', $password, PDO::PARAM_STR);
    	$stmt->bindValue(':email_address', $email, PDO::PARAM_STR);
    	$stmt->bindValue(':firstname', $first_nm, PDO::PARAM_STR);
    	$stmt->bindValue(':lastname', $last_nm, PDO::PARAM_STR);

        $response = $stmt->execute();

    	print_r($response);
    }

    function queryId($username) {
        global $db;
        $stmt = $db->prepare('SELECT user_id FROM public.user WHERE username=:un')
        $stmt->bindValue(':un', $username, PDO::PARAM_STR);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($rows as $row)
        {
          print_r($row['user_id']);
        }

    }
 }

?>