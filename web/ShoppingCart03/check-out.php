<?php
session_start();
?>

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
	<script type="text/javascript" src="check-out.js"></script>
	<style>
	.error {color: #FF0000;}
	</style>
</head>

	
<body onload="loadStateData()">

	<?php
// define variables and set to empty values
$line1Err = $cityErr = $zipErr = "";
$line1 = $line2 = $city = $zip = "";
$isValidLine1 = $isValidCity = $isValidZip = false;



if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["line1"])) {
    $line1Err = "Name is required";
  } else {
    $line1 = test_input($_POST["line1"]);
    if (!preg_match("/^(?:[Pp][Oo]\s[Bb][Oo][Xx]|[0-9]+)\s(?:[0-9A-Za-z\.'#]|[^\S\r\n])+$/",$line1)) {
      $line1Err = "Only letters, whitespace, and numbers are allowed";
    } else {
    	$isValidLine1 = true;
    	$_SESSION['address'] .= $line1 . ' ';
    }
  }
  
  if (empty($_POST["line2"])) {
    $line2 = "";
  } else {
    $line2 = test_input($_POST["line2"]);
    $_SESSION['address'] .= $line2 . '\n';
  }
    
  if (empty($_POST["city"])) {
    $cityErr = "City required";
  } else {
    $city = test_input($_POST["city"]);
    // check if URL address syntax is valid (this regular expression also allows dashes in the URL)
    if (!preg_match("/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/",$city)) {
      $cityErr = "Invalid city name";
    } else {
    	$isValidCity = true;
    	$_SESSION['address'] .= $city . ' ';
    	$_SESSION['address'] .= $state . ' ';
    }
  }

  if(empty($_POST["zip"])) {
      $zipErr = "Zip code required";
    } else {
      $zip = test_input($_POST["zip"]);
      if (!preg_match("/^\d{5}(?:[-\s]\d{4})?$/", $zip)) {
        $zipErr = "Invalid zip code";
      } else {
      	$isValidZip = true;
      	$_SESSION['address'] .= $zip;
      }
    }
  
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>
	<div class="container">
		<nav class="navbar navbar-light fixed-top"></nav>
		<br><br><br>
		<h1 <?php if($isValidLine1 && $isValidCity && $isValidZip) { echo 'style="display:none;"'; }?>>Enter your shipping address:</h1>
		<form method="post" <?php if($isValidLine1 && $isValidCity && $isValidZip) { echo 'style="display:none;"'; }?> action="">  
			Address Line 1: <input type="text" name="line1" value="<?php echo $line1;?>">
			<span class="error">* <?php echo $line1Err;?></span>
			<br><br>
			Address Line 2: <input type="text" name="line2" value="<?php echo $line2;?>">
			<br><br>
			City: <input type="text" name="city" value="<?php echo $city;?>">
			<span class="error">* <?php echo $cityErr;?></span>
			<br><br>
			State: <select name="state" id="state"></select>
	  		<br><br>
	  		Zip: <input type="text" name="zip" value="<?php echo $zip;?>">
	  		<span class="error">* <?php echo $zipErr;?></span>
	  		<br><br>
	  		<input type="submit" name="submit" value="Submit">  
		</form>
		<div id="space"></div>

		<?php
		function display() {
			$items = $_SESSION['items'];
			$length = $_SESSION['length'];
		    echo "CONFIRMED";
		    echo '<br>';
		    echo $_SESSION['address'];
		    
		    $decoded = json_decode($_SESSION['items'], true);
		    
		    for ($i = 0; $i < $length; $i++) {
		    	echo '<br>Item ' . ($i + 1) . ': ';
		    	echo $decoded[$i]['name']; 
		    }
		    
		  
		}

		 

		if(isset($_POST['submit'])) {
			if ($isValidLine1 && $isValidCity && $isValidZip) {
				display();
			} 
		}
		?>
			
	</div>

</body>
</html>