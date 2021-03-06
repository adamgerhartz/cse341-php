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
        $json = $this->dbModel->retrieveFirstName($this->sessionId);
        $data = json_decode($json, true);
        return $data;
    }
}

?>