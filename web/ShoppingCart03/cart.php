<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>View Cart</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="style.css">
	<link href='https://css.gg/trash.css' rel='stylesheet'>
	<link href='https://css.gg/arrow-left.css' rel='stylesheet'>
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">	
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
	
	<script>
		let items = <?php echo $_SESSION['items']?>;
		let length = <?php echo $_SESSION['length']?>;
	</script>
	<script src="cart.js"></script>
</head>
<body onload="renderDoc()">

	<div class="container">
			<nav class="navbar navbar-light fixed-top">
  				<button type="button" class="btn btn-success" onclick="location.href = 'browse.php'">
  					<span class="badge badge-primary"><i class="gg-arrow-left"></i><span class="badge badge-primary" style="font-size:1.3em; margin-left: 10px;">Continue Shopping</span></span>
				</button>
			</nav>
			<br><br><br>
			<h1>My cart: <span id="length"></span></h1>
			<table class="table"></table>
			<button type="button" id="check-out" class="btn btn-success btn-lg btn-block" onclick="location.href = 'check-out.php'" style="background-color: #E2CFB6 !important;">Check Out</button>
			<div id="space"></div>
			
		</div>


</body>
</html>