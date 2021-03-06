<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset="UTF-8">
	<title>Connecting to db practice</title>
</head>
<body>

	<?php
	try
	{
		$dbUrl = getenv('DATABASE_URL');

		$dbOpts = parse_url($dbUrl);

		$dbHost = $dbOpts['host'];
		$dbPost = $dbOpts['port'];
		$dbUser = $dbOpts['user'];
		$dbPassword = $dbOpts['pass'];
		$dbName = ltrim($dbOpts["path"], '/');

		$db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);

		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch (PDOException $ex)
	{	
		echo 'ERROR: ' . $ex->getMessage();
		die();
	}

	foreach ($db->query('SELECT username, password FROM note_user') as $row)
	{
		echo 'user: ' . $row['username'];
		echo ' password: ' . $row['password'];
		echo '<br/>';
	} 
	?>

</body>
</html>