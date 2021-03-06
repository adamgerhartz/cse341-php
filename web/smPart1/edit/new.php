<?php 
    session_start();
    require('../db/dbModel.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Temp</title>
</head>
<body>

<?php
    $_SESSION['error'] = '';
    $firstName = $_POST['first_name'];
    $lastName  = $_POST['last_name'];
    $about_me = $_POST['about-me'];
    
    // security
    $firstName = htmlspecialchars($firstName);
    $lastName = htmlspecialchars($lastName);
    $about_me = htmlspecialchars($about_me);
    //trim left and right
    $about_me = ltrim($about_me);
    $about_me = rtrim($about_me);
    $firstName = ltrim($firstName);
    $firstName = rtrim($firstName);
    $lastName = ltrim($lastName);
    $lastName = rtrim($lastName);
    $isValid = isValid($firstName, $lastName); 
    if (!$isValid) {
        header('Location: edit-profile.php');
    } else {
        sendToDb($firstName, $lastName, $about_me);
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
            $_SESSION['error'] = '* Error: First name is empty';
            return true;
        }
        if ($l === '') {
            $_SESSION['error'] = '* Error: Last name is empty';
            return true;
        }
        $_SESSION['error'] = '';
        return false;
    }

    function lengthIsHigh($f, $l) {
        if (strlen($f) > 100) {
            $_SESSION['error'] = '* Error: First name should not exceed 100 characters';
            return true;
        }
        if (strlen($l) > 100) {
            $_SESSION['error'] = '* Error: Last name should not exceed 100 characters';
            return true;
        }
        $_SESSION['error'] = '';
        return false;
    }

    function isInvalidName($f, $l) {
        $exp = "/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u";
        if (preg_match($exp, $f) !== 1) {
            $_SESSION['error'] = '* Error: First name is invalid';
            return true;
        }
        if (preg_match($exp, $l) !== 1) {
            $_SESSION['error'] = '* Error: Last name is invalid';
            return true;
        }
        $_SESSION['error'] = '';
        return false;
    }

    function sendToDb($first, $last, $abtMe) {
        $dbModel = new DbModel;
        $response = $dbModel->editNameAndAboutMe($_SESSION['user_id'], $first, $last, $abtMe);
        if ($response) {
            header('Location: ../home/home.php');
        } else {
            $_SESSION['error'] = '* Error: Profile information not updated.';
            header('Location: edit-profile.php');
        }
    }
?>

</body>
</html>