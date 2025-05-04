<?php

// ROUTES

use Pecee\SimpleRouter\SimpleRouter as Router;

require_once 'Controllers/DashboardController.php';
require_once 'Controllers/TodoController.php';
require_once 'Controllers/CategoryController.php';

// CUSTOM FAV ICON
Router::get('/favicon.ico', function() {

    header('Content-Type: image/x-icon');
    readfile('./files/fav/note.png');
});
// --------------- //

Router::get('/', [DashboardController::class, 'index']);
Router::get('/api/todos', [TodoController::class, 'index']);
Router::get('/api/categories', [CategoryController::class, 'index']);

?>
