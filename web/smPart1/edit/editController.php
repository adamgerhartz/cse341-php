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
        $this->addEventListeners();
    }

    function addEventListeners() {
        // echo '<script>  

        //         const submit = document.getElementbById("submit")
        //         submit.addEventLister("click", (event)=> {
        //            event.preventDefault();
        //            <p>Hello</p>;
        //         });
        
        //       </script>';

        if (isset($_POST['submit'])) {
            echo 'HURRAY!';
        }
    }
}

?>