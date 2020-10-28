<?php
session_start();
require('homeController.php');
$homeController = new HomeController('main-page');

//$homeController->showHomepage();
?>