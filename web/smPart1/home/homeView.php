<?php
session_start();

class HomeView {
    function __construct($parentId) {
        $this->parentId = $parentId;
    }

    function renderPage($data) {
        $default = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
        echo '<div class="container-fluid">';
        echo '<div class="row" id="row1">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col-sm-1">';
        echo '<a id="target" href="">Home</a>';
        echo '</div>'; // end col-sm-1
        echo '<div class="col-sm-1">';
        echo '<a href="../edit/edit-profile.php">Edit</a>';
        echo '</div>'; // end col-sm-1
        echo '<div class="col-sm-5">';
        echo '<a href="../login/login.html">Logout</a>';
        echo '</div>'; // end col-sm-5
        echo '</div>'; // end row 1
        

        echo '<div class="row" id="row2">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="d-flex justify-content-start align-items-start clearfix">';
        echo '<div id="profile_back" class="float-left">';
        echo '<img id="profile_picture" src="' . ((isset($data['photo_uri'])) ? $data['photo_uri'] : $default) . '" alt="Profile picture of ' . $data['first_name'] . ' ' . $data['last_name'] . '">';
        echo '</div>'; // end profile_back
        
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col" id="text">';
		echo '<h1><strong>' . $data['first_name'] . ' ' . $data['last_name'] . '</strong></h1>';
        echo '<h6 id="author">' . $data['about_me'] . '</h6>';
        echo '</div>'; // end align middle
        echo '</div>'; // end text
        
		echo '</div>'; // end row 2
        echo '<hr>';
        
        echo '</div>'; // end container fluid
    }
}

?>