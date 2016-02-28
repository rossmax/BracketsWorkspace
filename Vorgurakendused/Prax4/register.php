<?php

include('db.php');

if (isset($_POST['user']) && isset($_POST['pass']) ) {

    $username = $_POST['user'];
     $password = $_POST['pass'];

    $sql = "INSERT iNTO user (username, pawssword)".

        //echo $sql;
    if(mysqli_query($connection, $sql)){
        header('Location: index.php');
        exit;
    } else {
        echo 'KOIK ON TUKSIS!';
    }
}
?>

<!doctype html>
<html>

    <head>
        <meta charset="utf-8">
        <title>Register</title>

    </head>

    <body>
        <h1>Tegister</h1>
        <form method="post">

            Username:
            <br>
            <input type="text" name="user" placeholder="Username">
            <br>



        </form>

    </body>

</html>
