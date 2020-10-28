<?php
session_start();
require('db/dbModel.php');

class HomeModel {
    function __construct() {
        $this->dbModel = new DbModel;
        $this->response = '';
        $this->sessionId = $_SESSION['user_id'];
    }

    function fetchHomeData() {
        $firstName = $this->dbModel->retrieveFirstName($this->sessionId);
        return $firstName;
    }
}

?>