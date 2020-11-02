<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Temp</title>
</head>
<body>

<?php
    if (!isset($_POST['first_name']) || !isset($_POST['last_name'])) {
        header('Location: edit-profile.php');
    }
?>

</body>
</html>