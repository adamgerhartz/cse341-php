<?php

$item = $_POST['item'];
$decoded = json_decode($item, true);

print_r($_SESSION['items'] = $decoded);

print_r($_SESSION);

// ob_start();
// require('browse.php');
// ob_get_clean();

// $item = $_POST['item'];

// $decoded = json_decode($item, true);
// print_r($_SESSION['items'][0]);


// if (!isset($_SESSION['items'])) {
	
//     $_SESSION['items'] = array();
// }
// array_push($_SESSION['items'], $decoded);
// // $_SESSION['item'] = $decoded;

// // // $arrayItems.array_push($array, ($_SESSION["items"] .= $item));

// var_dump($_SESSION['items'][0]);


?>