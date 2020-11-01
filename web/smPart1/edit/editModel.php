<?php
session_start();
require('../home/db/dbModel.php');

class EditModel {
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