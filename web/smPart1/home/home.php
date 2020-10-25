<?php
session_start();

$db = require('config.php');

$stmt = $db->prepare('SELECT first_name, last_name FROM public.user WHERE user_id=:id');
$stmt->bindValue(':id', $_SESSION['user_id'], PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$firstName = $rows[0]['first_name'];
$lastName = $rows[0]['last_name'];

?>

<!DOCTYPE html>
<html>
<head>
	<title>Home Page</title>
</head>
<body>

	<h1>Hi <?php echo $firstName . ' ' . $lastName;?>, your profile page is under construction.</h1>

</body>
</html>
