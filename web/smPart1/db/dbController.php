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
	default:
		break;
}

echo $response;

?>