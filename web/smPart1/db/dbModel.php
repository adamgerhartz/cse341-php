<?php

$db = include('config.php');

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
 }

?>