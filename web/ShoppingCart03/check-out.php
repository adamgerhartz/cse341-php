<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Check Out</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="style.css">
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">	
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</head>
<body>

	<div class="container">
		<nav class="navbar navbar-light fixed-top"></nav>
		<br><br><br>
		<h1>Enter your shipping address: <span id="length"></span></h1>
		<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

			<label for="address_line_1">Address Line 1</label>
			<input type="text" id="address_line_1" name="address_line_1">
			<span class="error">* <?php echo $addressErr;?></span>
			<br><br>
			<label for="address_line_2">Address Line 2</label>
			<input type="text" id="address_line_2" name="address_line_2">
			<span class="error"><?php echo $emailErr;?></span>
			<br><br>
			<label for="city">City</label>
			<input type="text" id="city" name="city">
			<span class="error">* <?php echo $cityErr;?></span>
			<br><br>
			<label for="state">State</label>
			<input type="text" id="state" name="state">
			<span class="error">* <?php echo $stateErr;?></span>
			<br><br>
			<label for="zip">Zip Code</label>
			<input type="text" id="zip" name="zip">
			<span class="error">* <?php echo $zipErr;?></span>
			<br><br>
			<input type="submit" name="submit" value="Submit">

		</form>
		<div id="space"></div>
			
	</div>

</body>
</html>