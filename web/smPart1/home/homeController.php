<?php
session_start();
require('homeModel.php');
require('homeView.php');

class HomeController {
    function __construct($parentId) {
        $this->parentId = $parentId;
        $this->homeModel = new HomeModel();
        $this->homeView = new HomeView($this->parentId);
    }

    function showHomepage() {
        $data = $this->homeModel->fetchHomeData();
        var_dump($data);
        //$this->homeView->renderPage($data);
    }
}

?>