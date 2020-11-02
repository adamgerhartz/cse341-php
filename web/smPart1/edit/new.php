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

    $firstName = $_POST['first_name'];
    $lastName  = $_POST['last_name'];
    
    echo strlen(ltrim($firstName)) . ' ' . strlen(rtrim($lastName));
    // security
    $firstName = htmlspecialchars($firstName);
    $lastName = htmlspecialchars($lastName);
    //trim left and right
    $firstName = ltrim($firstName);
    $firstName = rtrim($firstName);
    $lastName = ltrim($lastName);
    $lastName = rtrim($lastName);
    $isValid = isValid($firstName, $lastName); 
    if (!$isValid) {
        header('Location: edit-profile.php');
    }

    function isValid($first, $last) {
        if (isEmptyName($first, $last)) {
            return false;
        }
        if (lengthIsHigh($first, $last)) {
            return false;
        }
        if (isInvalidName($first, $last)) {
            return false;
        }
        return true;
    }

    function isEmptyName($f, $l) {
        if ($f === '') {
            $_SESSION['error'] = 'Error: First name is empty';
            return true;
        }
        if ($l === '') {
            $_SESSION['error'] = 'Error: Last name is empty';
            return true;
        }
        return false;
    }

    function lengthIsHigh($f, $l) {
        if (strlen($f) > 100) {
            $_SESSION['error'] = 'Error: First name should not exceed 100 characters';
            return true;
        }
        if (strlen($l) > 100) {
            $_SESSION['error'] = 'Error: Last name should not exceed 100 characters';
            return true;
        }
        return false;
    }

    function isInvalidName($f, $l) {
        $exp = "/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u";
        if (preg_match($exp, $f) !== 1) {
            $_SESSION['error'] = 'Error: First name is invalid';
            return true;
        }
        if (preg_match($exp, $l) !== 1) {
            $_SESSION['error'] = 'Error: Last name is invalid';
            return true;
        }
        return false;
    }
?>

</body>
</html>