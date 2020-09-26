<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="homepageCss.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
 	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	<title>Adam Gerhartz Homepage</title>
</head>
<body>

	<div class="container-fluid">
		<div class="row" id="row1">
			<div class="col-sm-1"></div>
			<div class="col-sm-1">
				<a id="target" href="#">Home</a>
			</div>
			<div class="col-sm-5">
				<a href="assignments.php">My CSE 341 Assignments</a>
			</div>
		</div>

		<div class="row" id="row2">
			<div class="align-middle">
				<div id="profile_back">
					<img id="profile_picture" src="https://raw.githubusercontent.com/adamgerhartz/images/master/headshot.png" alt="Picture of adamgerhartz">
				</div>
			</div>
		</div>
		<hr>

		<div class="row" id="row3">
			<div class="align-middle"></div>
				<div id="text">
					<h1><strong>Interested in side projocts</strong></h1>
					<h6 id="author">by Adam Gerhartz</h6>
					<p id="first_p">When I was in high school, I played varsity tennis. Tennis was a sport that I enjoyed playing for fun. Playing varsity in high school, however, was very competitive. I often hated the pressure. Coupled with nerves, my game wasn't as good as when I would goof around and just play for fun.</p>
					<p>When I start writing computer programs for fun, I am really able to express my creativity. Side projects have always been a good hobby of mine. I love being able to think out a problem and provide a solution to that problem. I like to program whatever is in my mind, from an Android application that helps a user memorize scriptures, to an interactive video game, to a spreedsheet generator. I like it all. If I think it, I want to program it, and I have fun doing it.</p>
				</div>
			</div>
			</div>
		</div>

		<div class="row" id="footer">
			<div class="col-sm-1"></div>
			<div class="col-sm-8">
				<span id="foot_text"><?php include 'footer.php';?></span>
			</div>
		</div>
	</div>

</body>
</html>