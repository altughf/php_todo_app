<?php

// ------------------- DATABASE ------------------- //

class DatabaseTasks{

    private $host_name = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $database_name = DB_NAME;

    private $databaseHandler;
    private $databaseState;
    private $databaseError;

    // ------------------------------------------- // CONNECT
    public function __construct(){

        $database_information = 'mysql:host=' . $this->host_name . ';dbname=' . $this->database_name;        // prepare DSN
        $options = array(

            // some PDO options > advance features

            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );

        // create database PDO instance
        try{

            $this->databaseHandler = new PDO($database_information, $this->user, $this->pass, $options);     // create connection instance
        
        } catch(PDOException $e){

            $this->databaseError = $e->getMessage();
            echo $this->databaseError;
        }
    }

    // ------------------------------------------- //

    // ------------------------------------------- // database > functions FOR MODELS

    // any query
    public function query($sql){

        $this->databaseState = $this->databaseHandler->prepare($sql);
    }

    // for > bind values
    public function bind($param, $value, $type = null){

        if(is_null($type)){

            switch(true){

                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;

                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;

                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;

                default:
                    $type = PDO::PARAM_STR;
            }
        }

        $this->databaseState->bindValue($param, $value, $type);
    }

    // execute database state
    public function execute(){

        return $this->databaseState->execute();
    }

    // fecth arrays
    public function resultSet(){

        $this->execute();
        return $this->databaseState->fetchAll(PDO::FETCH_OBJ);
    }

    // fetch single
    public function single(){

        $this->execute();
        return $this->databaseState->fetch(PDO::FETCH_OBJ);
    }

    // count rows
    public function rowCount(){

        return $this->databaseState->rowCount();    // a built-in PDO function
    }

    // last insert id table
    public function lastInsertId(){

        return $this->databaseHandler->lastInsertId();
    }
}

?>
