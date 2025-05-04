<?php

// USEFUL Functions

require_once 'utility/error_handler.php';
require_once 'utility/url_direction.php';

// USEFUL Constants

require_once 'preferences/config_constants.php';
require_once 'preferences/config_db.php';

// DATABASE CONNECT
require_once 'Database/DatabaseTasks.php';

// ------------ //

// ROUTER

require_once 'vendor/autoload.php';

use Pecee\SimpleRouter\SimpleRouter as Router;

require_once 'Routes.php';

Router::start();

// ----------- //

?>
