<?php

class CategoryModel {

    private $databaseInstance;

    public function __construct(){

        $this->databaseInstance = new databaseTasks;
    }

    public function createModel($category_item){

        $this->databaseInstance->query(

            'INSERT INTO categories(name,color) VALUES(:c_name,:c_color)'

        );

        $this->databaseInstance->bind(':c_name',$category_item['name']);
        $this->databaseInstance->bind(':c_color',$category_item['color']);

        if($this->databaseInstance->execute()){

            return true;

        } else {

            return false;
        }

    }

    public function updateModel($category_item){

        $this->databaseInstance->query(

            'UPDATE categories
            SET name = :c_name, color = :c_color
            WHERE categories.id = :category_item_id'

        );

        $this->databaseInstance->bind(':category_item_id',$category_item['id']);
        $this->databaseInstance->bind(':c_name',$category_item['name']);
        $this->databaseInstance->bind(':c_color',$category_item['color']);

        if($this->databaseInstance->execute()){

            return true;

        } else {

            return false;
        }

    }

    public function openModel($category_item_id){

        $this->databaseInstance->query(

            'SELECT categories.id, categories.name, categories.color
            FROM categories
            WHERE categories.id = :category_item_id'

        );

        $this->databaseInstance->bind(':category_item_id',$category_item_id);

        $openCategory_item = $this->databaseInstance->single();

        if($this->databaseInstance->rowCount() > 0){

            return $openCategory_item;

        } else {

            go_direction('404');
        }

    }

    ##### HARD DELETE #####

    public function deleteModel($category_item_id){

        $this->databaseInstance->query('DELETE FROM categories WHERE categories.id = :category_item_id');

        $this->databaseInstance->bind(':category_item_id',$category_item_id);
        if($this->databaseInstance->execute()){ return true; } else { return false; }
    }

}

?>
