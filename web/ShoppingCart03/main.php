<?php


session_start();




if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST['action'];
    switch($action) {
        case 'cart_length' : fetchLength(); break;
        case 'save_items' : saveItems(); break;
        case 'cart_items' : fetchItems(); break;
        case 'session' : getSession(); break;
  	}
}


function fetchLength() {
	if (!isset($_SESSION['length'])) {
		$_SESSION['length'] = 0;
	}
	print_r($_SESSION['length']);
}

function fetchItems() {
	if (isset($_SESSION['items']) && !empty($_SESSION['items'])) {
	 	print_r($_SESSION['items']);
	}	
}

function saveItems() {
	if(isset($_POST['item']) && !empty($_POST['item'])) {
		$_SESSION['items'] = $_POST['item'];
		$decoded = json_decode($_SESSION['items'], true);	
		
	}
	$_SESSION['length'] = count($decoded);
	print_r($_SESSION['items'] . ' ' . $_SESSION['length']);

}

?>