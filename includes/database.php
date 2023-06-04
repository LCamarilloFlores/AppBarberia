<?php
try{
    $db = mysqli_connect($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASS'], $_ENV['DB_BD']);
}
catch(Exception $e){
    // debuguear($e);
}


