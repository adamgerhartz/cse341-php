<?php
session_start();

$db = require('../db/config.php');

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

	<h1>Hi <?php echo $firstName . ' ' . $lastName;?></h1>
	<p>Your profile page is under construction.</p>
	<p>In the meantime, add an "About Me" to be displayed on your profile page in the future.</p>
	<label for="about_me">Review of W3Schools:</label>
	<form action="#" method="post">
		<textarea id='about_me' name='about_me' rows='4' cols='50'></textarea>
		<input type='submit' name='submit'>
	</form>

<?php

	if (isset($_POST['submit']) && isset($_POST['about_me'])) {
		$stmt = $db->prepare('UPDATE public.user SET about_me = :about_me WHERE user_id = :user_id');
		$stmt->bindValue(':about_me', $_POST['about_me'], PDO::PARAM_STR);
		$stmt->bindValue(':user_id', $_SESSION['user_id']. PDO::PARAM_INT);
		$stmt->execute();

		echo '<br>Successfully Saved<br>';
		echo 'Your "About Me" is saved as:<br>';

		$stmt = $db->prepare('SELECT about_me FROM public.user WHERE user_id = :user_id');
		$stmt->bindValue(':user_id', $_SESSION['user_id']. PDO::PARAM_INT);
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$about_me = $rows[0]['about_me'];

		echo '<br>' . $about_me;

	}

?>
</body>
</html>
