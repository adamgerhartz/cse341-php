<?php
session_start();
require('db/dbModel.php');

class HomeModel {
    function __construct() {
        $this->dbModel = new DbModel;
        $this->response = '';
        $this->sessionId = $_SESSION['user_id'];
    }

    function fetchProfileData() {
        $data = [];
        array_push($this->dbModel->retrieveFirstName($this->sessionId));
        echo $data[0];
    }
}

?>