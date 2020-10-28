<?php
session_start();

class HomeView {
    function __construct($parentId) {
        $this->parentId = $parentId;
    }

    function renderPage($data) {
        echo '<p id="data">' . $data . '</p>';
    }
}

?>