<?php
session_start();

class HomeView {
    function __construct($parentId) {
        $this->parentId = $parentId;
    }
}

?>