<?php

class TodoModel {

    private $databaseInstance;

    public function __construct(){

        $this->databaseInstance = new databaseTasks;
    }

    public function createModel($todo_item){

        $this->databaseInstance->query(
            'INSERT INTO todos(title, description, status, priority, due_date)
             VALUES(:t_title, :t_description, :t_status, :t_priority, :t_due_date)'
        );
    
        $this->databaseInstance->bind(':t_title', $todo_item['title']);
        $this->databaseInstance->bind(':t_description', $todo_item['description']);
        $this->databaseInstance->bind(':t_status', $todo_item['status']);
        $this->databaseInstance->bind(':t_priority', $todo_item['priority']);
        $this->databaseInstance->bind(':t_due_date', $todo_item['due_date']);
    
        if ($this->databaseInstance->execute()) {

            $todoId = $this->databaseInstance->lastInsertId(); // TAKE LAST INSERTED > TODO_ITEM ID > FOR ADD IT'S CATEGORIES

            if (!empty($todo_item['category_ids']) && is_array($todo_item['category_ids'])) {
                foreach ($todo_item['category_ids'] as $categoryId) {
                    $this->databaseInstance->query(
                        'INSERT INTO todo_category (todo_id, category_id) VALUES (:todo_id, :category_id)'
                    );
                    $this->databaseInstance->bind(':todo_id', $todoId);
                    $this->databaseInstance->bind(':category_id', $categoryId);
                    $this->databaseInstance->execute();
                }
            }
    
            return true;

        } else { return false; }

    }

    public function updateModel($todo_item){

        $this->databaseInstance->query(
            'UPDATE todos
            SET title = :t_title, description = :t_description, status = :t_status, priority = :t_priority, due_date = :t_due_date
            WHERE id = :todo_item_id'
        );

        $this->databaseInstance->bind(':todo_item_id', $todo_item['id']);
        $this->databaseInstance->bind(':t_title', $todo_item['title']);
        $this->databaseInstance->bind(':t_description', $todo_item['description']);
        $this->databaseInstance->bind(':t_status', $todo_item['status']);
        $this->databaseInstance->bind(':t_priority', $todo_item['priority']);
        $this->databaseInstance->bind(':t_due_date', $todo_item['due_date']);

        if ($this->databaseInstance->execute()) {

            // TODO_ITEM > DELETE ALL CATEGORIES BEFORE (MANY TO MANY > FOR NO COMPLICATION)
            $this->databaseInstance->query(
                'DELETE FROM todo_category WHERE todo_id = :todo_id'
            );
            $this->databaseInstance->bind(':todo_id', $todo_item['id']);
            $this->databaseInstance->execute();

            // ADD NEW ONES > UPDATED CATEGORIES
            if (!empty($todo_item['category_ids']) && is_array($todo_item['category_ids'])) {
                foreach ($todo_item['category_ids'] as $categoryId) {
                    $this->databaseInstance->query(
                        'INSERT INTO todo_category (todo_id, category_id) VALUES (:todo_id, :category_id)'
                    );
                    $this->databaseInstance->bind(':todo_id', $todo_item['id']);
                    $this->databaseInstance->bind(':category_id', $categoryId);
                    $this->databaseInstance->execute();
                }
            }

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

        if ($this->databaseInstance->rowCount() === 0) {
            go_direction('404');
        }
    
        // QUERY 02 > CATEGORIES (Many To Many)
        $this->databaseInstance->query(
            'SELECT categories.id, categories.name, categories.color
            FROM todo_category
            INNER JOIN categories ON todo_category.category_id = categories.id
            WHERE todo_category.todo_id = :todo_item_id'
        );
    
        $this->databaseInstance->bind(':todo_item_id', $todo_item_id);
        $category_descriptor = $this->databaseInstance->resultSet();
    
        // ADD CATEGORIES TO RESULTS
        $openTodo_item->categories = !empty($category_descriptor) ? $category_descriptor : [];
    
        return $openTodo_item;

    }

    /* ##### SOFT DELETE ##### */

    public function deleteModel($todo_item_id) {
        $this->databaseInstance->query('UPDATE todos SET deleted_at = NOW() WHERE id = :todo_item_id');
    
        $this->databaseInstance->bind(':todo_item_id', $todo_item_id);
        return $this->databaseInstance->execute();
    }

    /*
    
    ##### HARD DELETE #####

    public function deleteModel($todo_item_id){

        $this->databaseInstance->query('DELETE FROM todos WHERE todos.id = :todo_item_id');

        $this->databaseInstance->bind(':todo_item_id',$todo_item_id);
        if($this->databaseInstance->execute()){ return true; } else { return false; }
    }

    */

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

        if (!empty($filter_parameters['q'])) {
            $query .= " AND (title LIKE :q OR description LIKE :q)";
            $bindings[':q'] = '%' . $filter_parameters['q'] . '%';
        }

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

    public function todosCountModel($filter_parameters) {
        $query = "SELECT COUNT(*) as total_results FROM todos WHERE deleted_at IS NULL";
        $bindings = [];
    
        if (!empty($filter_parameters['status'])) {
            $query .= " AND status = :status";
            $bindings[':status'] = $filter_parameters['status'];
        }
    
        if (!empty($filter_parameters['priority'])) {
            $query .= " AND priority = :priority";
            $bindings[':priority'] = $filter_parameters['priority'];
        }
    
        if (!empty($filter_parameters['q'])) {
            $query .= " AND (title LIKE :q OR description LIKE :q)";
            $bindings[':q'] = '%' . $filter_parameters['q'] . '%';
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
