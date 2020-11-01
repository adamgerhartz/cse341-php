<?php
session_start();
require('editModel.php');
require('editView.php');

class EditController {
    function __construct($parentId) {
        $this->parentId = $parentId;
        $this->editModel = new EditModel();
        $this->editView = new EditView($this->parentId);
    }

    function showEditPage() {
        $data = $this->editModel->fetchProfileData();
        $this->editView->renderPage($data);
    }
}

?>