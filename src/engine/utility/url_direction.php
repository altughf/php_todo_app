<?php

// GO TO > ANY PAGE

function go_direction($page_direction){

    header('Location: ' . URLROOT . '/' . $page_direction);
    exit;

}

// GO > MAIN PAGE

function go_site(){

    header('Location: ' . URLROOT);
    exit;

}

?>
