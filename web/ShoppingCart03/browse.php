<?php
// Start the session
session_start();
$_SESSION['items'] = array();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Shopping Cart</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="style.css">
	<link href='https://css.gg/shopping-cart.css' rel='stylesheet'>
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">	
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
	

	<script>
		<?php include 'api.php';?>

		let output = <?php echo $output?>;
		
	</script>
	<script src="main.js"></script>

</head>
<body onload="addTable()">
	
		<div class="container-fluid">
			<nav class="navbar navbar-light fixed-top">
  				<button type="button" class="btn btn-success ml-auto">
  				<span class="badge badge-primary"><i class="gg-shopping-cart"></i><span style="visibility:hidden" id="cart-length">0</span></span>
			</button>
			</nav>
			<br><br>
			<h1>Browse Items</h1>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
			<div class="row"></div>
		</div>

	<!-- <script src="main.js"></script> -->
</body>
</html>