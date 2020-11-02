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
    
    echo count($firstName) . ' ' . count($lastName);
    if ($firstName === '' || $lastName === '') {
        $isValid = isValid($firstName, $lastName);
        if (!$isValid) {
            header('Location: edit-profile.php');
        }
    }

    function isValid($first, $last) {
        if (isEmptyName($first, $last)) {
            return false;
        }
        if (isSpaceFront($first, $last)) {
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

    function isSpaceFront($f, $l) {
        $fRest = substr($f, 0, 1);
        if ($fRest === ' ') {
            $_SESSION['error'] = 'Error: First name should not start with a whitespace';
            return true;
        }
        $lRest = substr($l, 0, 1);
        if ($lRest === ' ') {
            $_SESSION['error'] = 'Error: Last name should not start with a whitespace';
            return true;
        }
        return false;
    }

    function lengthIsHigh($f, $l) {
        if (count($f) > 100) {
            $_SESSION['error'] = 'Error: First name should not exceed 100 characters';
            return true;
        }
        if (count($l) > 100) {
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