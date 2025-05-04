<?php

class TodoController {

    public function index(){

        // DEFAULT LIST # OR # ANALYZE QUERY

        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'TODO List']);

    }

    public function open($id){

        // OPEN FROM DATABASE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'OPEN' . $id]);

    }

    public function create(){

        $input = json_decode(file_get_contents('php://input'), true);

        // ADD TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(201);
        echo json_encode(['status' => 'success','information' => 'Add Todo', 'data' => $input]);

    }

    public function update($id){

        $input = json_decode(file_get_contents('php://input'), true);

        // UPDATE TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'UPDATE' . $id, 'data' => $input]);

    }

    public function updateStatus($id){

        $input = json_decode(file_get_contents('php://input'), true);

        // UPDATE TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'UPDATE STATUS' . $id, 'data' => $input]);

    }

    public function delete($id){

        // DELETE FROM DATABASE > SUCCESS # OR # ERROR RESPONSE

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
