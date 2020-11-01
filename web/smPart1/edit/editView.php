<?php
session_start();

class EditView {
    function __construct($parentId) {
        $this->parentId = $parentId;
    }

    function renderPage($data) {
        $default = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'; 
        $abtMeDefault = '';
        echo '<div class="container-fluid">';
        echo '<div class="row" id="row1">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col-sm-1">';
        echo '<a href="../home/home.php">Home</a>';
        echo '</div>'; // end col-sm-1
        echo '<div class="col-sm-1">';
        echo '<a id="target" href="#">Edit</a>';
        echo '</div>'; // end col-sm-1
        echo '<div class="col-sm-5">';
        echo '<a href="../login/login.html">Logout</a>';
        echo '</div>'; // end col-sm-5
        echo '</div>'; // end row 1
        
        // Start Form
        echo '<form action="../uploads/upload.php" class="md-form" name="editForm" method="post">';
        echo '<div class="row" id="row2">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col" id="text">';
        echo '<h1><strong>Edit your profile...</strong></h1>';
        echo '</div>'; // end text container
        echo '</div>'; // end row 2
        echo '<hr>';

        // Row 3
        echo '<div class="row" id="row3">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col" id="text">';
        echo '<h2>Upload a photo:</h2>';
        echo '<input type="file" id="file" tabindex="-1" name="file">';
        echo '<span id="msg-disable">This feature is currently disabled and under construction</span>';
        echo '</div>'; // end text container
		echo '</div>'; // end row 3
        echo '<hr>';

        // Row 4
        echo '<div class="row" id="row4">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="form-group">';
        echo '<div class="col" id="text">';
        echo '<h2>About me:</h2>';
        echo '<textarea name="about-me" id="about-me" class="form-control">' . ((isset($data['about_me'])) ? $data['about_me'] : $abtMeDefault) . '</textarea>';
        echo '</div>'; // end text container
        echo '</div>';
		echo '</div>'; // end row 4
        echo '<hr>';

        // Row 5
        echo '<div class="row" id="row5">';
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col" id="text">';
        echo '<h2>Update your name</h2>';
        echo '<br>First: <input type="text" name="first_name">';
        echo 'Last: <input type="text" name="last_name">';
        echo '</div>'; // end text container
		echo '</div>'; // end row 5

        echo '</form>'; // End form
        
        echo '</div>'; // end container fluid
    }
}

?>