<?php
session_start();

$db = require('config.php');

class DbModel {

    function queryUsername($username) {
      	global $db;
      	$stmt = $db->prepare('SELECT user_id, username FROM public.user WHERE username=:un');
	    $stmt->bindValue(':un', $username, PDO::PARAM_STR);
	    $stmt->execute();
	    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	    if (count($rows) === 1) {
	    	print_r('true');
            $_SESSION['user_id'] = $rows[0]['user_id'];
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
	
	function editNameAndAboutMe($id, $first, $last, $about_me) {
		global $db;
		$stmt = $db->prepare("UPDATE public.user SET first_name=:first_name, last_name=:last_name, about_me=:about_me, last_update_date=NOW() WHERE user_id=:id;");
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		$stmt->bindValue(':first_name', $first, PDO::PARAM_STR);
		$stmt->bindValue(':last_name', $last, PDO::PARAM_STR);
		$stmt->bindValue(':about_me', $about_me, PDO::PARAM_STR);

		$response = $stmt->execute();

		print_r($response);
	}
 }

?>