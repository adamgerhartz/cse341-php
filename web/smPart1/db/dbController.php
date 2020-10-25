<?php
session_start();

require('dbModel.php');

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
		if ($response == '1') {
			$_SESSION['id'] = $username;
		}
		break;
	case 'add':
		$username = $_POST['un'];
		$password = $_POST['pw'];
		$email = $_POST['em'];
		$first_nm = $_POST['fn'];
		$last_nm = $_POST['ln'];
		$response = $dbModel->addRecord($username, $password, $email, $first_nm, $last_nm);
		break;
	default:
		break;
}

echo $response;

?>