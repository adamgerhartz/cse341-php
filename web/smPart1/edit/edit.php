<?php
session_start();
require('editController.php');
$editController = new EditController('edit-page');

$editController->showEditPage();
?>