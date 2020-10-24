<?php

include('dbModel.php');

$dbModel = new DbModel;
$response = '';

switch ($_POST['type']) {
	case 'username':
		$username = $_POST['value1'];
		$response = $dbModel->queryUsername($username);
		break;
	case 'password':
		$password = $_POST['value1'];
		$username = $_POST['value2'];
		$response = $dbModel->queryPassword($password, $username);
		break;
	case 'add':
		$username = $_POST['value1'];
		$password = $_POST['value5'];
		$email = $_POST['value2'];
		$first_nm = $_POST['value3'];
		$last_nm = $_POST['value4'];
		$response = $dbModel->addRecord($username, $password, $email, $first_nm, $last_nm);
		break;
	default:
		break;
}

echo $response;

?>