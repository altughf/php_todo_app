<?php

class TodoController {

    private $todoModel_instance;

    public function __construct(){

        require_once APPROOT . '/Models/TodoModel.php';
        $this->todoModel_instance = new TodoModel;
    }

    public function index(){

        // DEFAULT LIST # OR # ANALYZE QUERY

        $data = $this->todoModel_instance->todosModel();

        http_response_code(200);
        echo json_encode(['status' => 'success','information' => $data]);

    }

    public function open($id){

        // OPEN FROM DATABASE

        $data = $this->todoModel_instance->openModel($id);

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','item' => $data]);

    }

    public function create(){

        $data = json_decode(file_get_contents('php://input'), true);

        $todo_item = [

            'title'                 => trim($data['todo-title']),
            'description'           => trim($data['todo-description']),
            'status'                => trim($data['todo-status']),
            'priority'              => trim($data['todo-priority']),
            'due_date'              => trim($data['todo-due-time']),
        ];

        $insert_ok = $this->todoModel_instance->createModel($todo_item);

        // ADD TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(201);
        echo json_encode(['status' => 'success','information' => 'Add Todo', 'data' => $data]);

    }

    public function update($id){

        $data = json_decode(file_get_contents('php://input'), true);

        $todo_item = [

            'id'                    => $id,
            'title'                 => trim($data['todo-title']),
            'description'           => trim($data['todo-description']),
            'status'                => trim($data['todo-status']),
            'priority'              => trim($data['todo-priority']),
            'due_date'              => trim($data['todo-due-time']),
        ];

        $update_ok = $this->todoModel_instance->updateModel($todo_item);

        // UPDATE TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'UPDATE' . $id, 'data' => $data]);

    }

    public function updateStatus($id){

        $data = json_decode(file_get_contents('php://input'), true);

        $todo_item = [

            'id'                    => $id,
            'status'                => trim($data['todo-status']),
        ];

        $update_ok = $this->todoModel_instance->updateStatusModel($todo_item);

        // UPDATE TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'UPDATE STATUS' . $id, 'data' => $data]);

    }

    public function delete($id){

        // DELETE FROM DATABASE > SUCCESS # OR # ERROR RESPONSE

        $this->todoModel_instance->deleteModel($id);

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'DELETE' . $id]);

    }

    public function search(){

        $query = $_GET['q'] ?? '';

        // ANALYZE QUERY > SEARCH DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'Find', 'query' => $query]);

    }

}

?>
