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

            'SELECT categories.id, categories.name, categories.color, categories.created_at, categories.updated_at
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

    public function categoriesModel(){

        $this->databaseInstance->query(

            'SELECT categories.id,categories.name, categories.color, categories.created_at, categories.updated_at
            FROM categories'

        );

        $todos = $this->databaseInstance->resultSet();

        return $todos;

    }

    public function todosModel($filter_parameters) {
        $offset = ($filter_parameters['page'] - 1) * $filter_parameters['limit'];
    
        $query = "
            SELECT 
                todos.id,
                todos.title,
                todos.description,
                todos.status,
                todos.priority,
                todos.due_date,
                todos.created_at,
                todos.updated_at,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', categories.id,
                        'name', categories.name,
                        'color', categories.color
                    )
                ) AS category_ids
            FROM todos
            LEFT JOIN todo_category ON todos.id = todo_category.todo_id
            LEFT JOIN categories ON todo_category.category_id = categories.id
            WHERE todos.deleted_at IS NULL AND categories.id = :category_id
        ";
    
        $bindings = [];
        $bindings = [':category_id' => $filter_parameters['category_id']];
    
        if (!empty($filter_parameters['status'])) {
            $query .= " AND todos.status = :status";
            $bindings[':status'] = $filter_parameters['status'];
        }
    
        $query .= " GROUP BY todos.id";
    
        // Sıralama parametreleri
        $sortable = ['created_at', 'due_date'];
        $orderable = ['asc', 'desc'];
    
        if (!in_array($filter_parameters['sort'], $sortable)) {
            $filter_parameters['sort'] = 'due_date';
        }
    
        if (!in_array($filter_parameters['order'], $orderable)) {
            $filter_parameters['order'] = 'asc';
        }
    
        $query .= " ORDER BY {$filter_parameters['sort']} {$filter_parameters['order']} LIMIT :limit OFFSET :offset";
    
        $this->databaseInstance->query($query);
    
        foreach ($bindings as $key => $value) {
            $this->databaseInstance->bind($key, $value);
        }
    
        $this->databaseInstance->bind(':limit', (int)$filter_parameters['limit']);
        $this->databaseInstance->bind(':offset', (int)$offset);
    
        $todo_results = $this->databaseInstance->resultSet();
    
        foreach ($todo_results as $todo_item) {
            $todo_item->category_ids = json_decode($todo_item->category_ids);
        }
    
        return $todo_results;
    }

    public function todosCountModel($filter_parameters) {
        $query = "
            SELECT COUNT(DISTINCT todos.id) as total_results
            FROM todos
            LEFT JOIN todo_category ON todos.id = todo_category.todo_id
            LEFT JOIN categories ON todo_category.category_id = categories.id
            WHERE todos.deleted_at IS NULL AND categories.id = :category_id
        ";
    
        $bindings = [];
        $bindings = [':category_id' => $filter_parameters['category_id']];
    
        if (!empty($filter_parameters['status'])) {
            $query .= " AND todos.status = :status";
            $bindings[':status'] = $filter_parameters['status'];
        }
    
        $this->databaseInstance->query($query);
    
        foreach ($bindings as $key => $value) {
            $this->databaseInstance->bind($key, $value);
        }
    
        $result = $this->databaseInstance->single();
    
        return $result->total_results;
    }

}

?>
