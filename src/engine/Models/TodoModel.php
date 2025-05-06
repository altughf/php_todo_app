<?php

class TodoModel {

    private $databaseInstance;

    public function __construct(){

        $this->databaseInstance = new databaseTasks;
    }

    public function createModel($todo_item){

        $this->databaseInstance->query(

            'INSERT INTO todos(title,description,status,priority,due_date) VALUES(:t_title,:t_description,:t_status,:t_priority,:t_due_date)'

        );

        $this->databaseInstance->bind(':t_title',$todo_item['title']);
        $this->databaseInstance->bind(':t_description',$todo_item['description']);
        $this->databaseInstance->bind(':t_status',$todo_item['status']);
        $this->databaseInstance->bind(':t_priority',$todo_item['priority']);
        $this->databaseInstance->bind(':t_due_date',$todo_item['due_date']);

        if($this->databaseInstance->execute()){

            return true;

        } else {

            return false;
        }

    }

    public function updateModel($todo_item){

        $this->databaseInstance->query(

            'UPDATE todos
            SET title = :t_title, description = :t_description, status = :t_status, priority = :t_priority, due_date = :t_due_date
            WHERE todos.id = :todo_item_id'

        );

        $this->databaseInstance->bind(':todo_item_id',$todo_item['id']);
        $this->databaseInstance->bind(':t_title',$todo_item['title']);
        $this->databaseInstance->bind(':t_description',$todo_item['description']);
        $this->databaseInstance->bind(':t_status',$todo_item['status']);
        $this->databaseInstance->bind(':t_priority',$todo_item['priority']);
        $this->databaseInstance->bind(':t_due_date',$todo_item['due_date']);

        if($this->databaseInstance->execute()){

            return true;

        } else {

            return false;
        }

    }

    public function updateStatusModel($todo_item){

        $this->databaseInstance->query(

            'UPDATE todos
            SET status = :t_status
            WHERE todos.id = :todo_item_id'

        );

        $this->databaseInstance->bind(':todo_item_id',$todo_item['id']);
        $this->databaseInstance->bind(':t_status',$todo_item['status']);

        if($this->databaseInstance->execute()){

            return true;

        } else {

            return false;
        }

    }

    public function openModel($todo_item_id){

        $this->databaseInstance->query(

            'SELECT todos.id, todos.title, todos.description, todos.status, todos.priority, todos.due_date, todos.created_at, todos.updated_at, todos.deleted_at
            FROM todos
            WHERE todos.id = :todo_item_id'

        );

        $this->databaseInstance->bind(':todo_item_id',$todo_item_id);

        $openTodo_item = $this->databaseInstance->single();

        if($this->databaseInstance->rowCount() > 0){

            return $openTodo_item;

        } else {

            go_direction('404');
        }

    }

    public function deleteModel($todo_item_id){

        $this->databaseInstance->query('DELETE FROM todos WHERE todos.id = :todo_item_id');

        $this->databaseInstance->bind(':todo_item_id',$todo_item_id);

        if($this->databaseInstance->execute()){

            return true;

        } else {

            return false;
        }

    }

    public function todosModel($filter_parameters) {
        $offset = ($filter_parameters['page'] - 1) * $filter_parameters['limit'];
    
        $query = "SELECT * FROM todos WHERE deleted_at IS NULL";
    
        $bindings = [];
    
        if (!empty($filter_parameters['status'])) {
            $query .= " AND status = :status";
            $bindings[':status'] = $filter_parameters['status'];
        }
    
        if (!empty($filter_parameters['priority'])) {
            $query .= " AND priority = :priority";
            $bindings[':priority'] = $filter_parameters['priority'];
        }
    
        // Güvenli sıralama için izin verilen kolonları kontrol et
        $sortable = ['created_at', 'due_date', 'priority'];
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
    
        return $this->databaseInstance->resultSet();
    }    

}

?>
