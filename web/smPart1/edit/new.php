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
    
    echo $_POST['first_name'] . ' ' . $_POST['last_name'];
    if (!isset($_POST['first_name']) || !isset($_POST['last_name'])) {
        echo 'Function Called';
        header('Location: edit-profile.php');
    }
?>

</body>
</html>