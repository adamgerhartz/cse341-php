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
        echo '<div class="d-flex flex-wrap justify-content-start align-items-start clearfix">';
        echo '<div id="profile_back" class="float-left">';
        echo '<img id="profile_picture" src="' . ((isset($data['photo_uri'])) ? $data['photo_uri'] : $default) . '" alt="Profile picture of ' . $data['first_name'] . ' ' . $data['last_name'] . '">';
        echo '</div>'; // end profile_back
        
        echo '<div class="col-sm-1"></div>';
        echo '<div class="col" id="text">';
		echo '<h1><strong>' . $data['first_name'] . ' ' . $data['last_name'] . '</strong></h1>';
        echo '<h6 id="author">' . $data['about_me'] . '</h6>';
        echo '</div>'; // end align middle
        //echo '<p id="first_p">When I was in high school, I played varsity tennis. Tennis was a sport that I enjoyed playing for fun. Playing varsity in high school, however, was very competitive. I often hated the pressure. Coupled with nerves, my game wasn\'t as good as when I would goof around and just play for fun.</p>';
        //echo '<p>When I start writing computer programs for fun, I am really able to express my creativity. Side projects have always been a good hobby of mine. I love being able to think out a problem and provide a solution to that problem. I like to program whatever is in my mind, from an Android application that helps a user memorize scriptures, to an interactive video game, to a spreedsheet generator. I like it all. If I think it, I want to program it, and I have fun doing it.</p>';
        echo '</div>'; // end text
        
		echo '</div>'; // end row 2
        echo '<hr>';
        
        echo '</div>'; // end container fluid
    }
}

?>