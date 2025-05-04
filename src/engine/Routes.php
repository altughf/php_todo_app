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

// PRIMARY TASKS

Router::get('/api/todos', [TodoController::class, 'index']);
Router::get('/api/todos/{id}', [TodoController::class, 'open']);
Router::post('/api/todos', [TodoController::class, 'create']);
Router::put('/api/todos/{id}', [TodoController::class, 'update']);
Router::patch('/api/todos/{id}/status', [TodoController::class, 'updateStatus']);
Router::delete('/api/todos/{id}', [TodoController::class, 'delete']);
Router::get('/api/todos/search', [TodoController::class, 'search']);

// Router::get('/', [DashboardController::class, 'index']);
// Router::get('/api/categories', [CategoryController::class, 'index']);

?>
