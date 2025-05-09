<?php

class CategoryController {

    private $categoryModel_instance;

    public function __construct(){

        require_once APPROOT . '/Models/CategoryModel.php';
        $this->categoryModel_instance = new CategoryModel;
    }

    public function index(){

        // DEFAULT LIST # OR # ANALYZE QUERY

        $data = $this->categoryModel_instance->categoriesModel();

        http_response_code(200);
        echo json_encode(['status' => 'success','information' => $data]);

    }

    public function open($id){

        // OPEN FROM DATABASE

        $data = $this->categoryModel_instance->openModel($id);

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','item' => $data]);

    }

    public function create(){

        $data = json_decode(file_get_contents('php://input'), true);

        $category_item = [

            'name'                  => trim($data['category-name']),
            'color'                 => trim($data['category-color']),
        ];

        $insert_ok = $this->categoryModel_instance->createModel($category_item);

        // ADD TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(201);
        echo json_encode(['status' => 'success','information' => 'Add Category', 'data' => $data]);

    }

    public function update($id){

        $data = json_decode(file_get_contents('php://input'), true);

        $category_item = [

            'id'                    => $id,
            'name'                  => trim($data['category-name']),
            'color'                 => trim($data['category-color']),
        ];

        $update_ok = $this->categoryModel_instance->updateModel($category_item);

        // UPDATE TO DATABASE > SUCCESS # OR # ERROR RESPONSE

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'UPDATE' . $id, 'data' => $data]);

    }

    public function delete($id){

        // DELETE FROM DATABASE > SUCCESS # OR # ERROR RESPONSE

        $this->categoryModel_instance->deleteModel($id);

        // http_response_code(400);
        http_response_code(200);
        echo json_encode(['status' => 'success','information' => 'DELETE' . $id]);

    }

    public function todo_list($id) {
        $page = $_GET['page'] ?? 1;
        $limit = min($_GET['limit'] ?? 10, 50);
        $sort = $_GET['sort'] ?? 'due_date';
        $order = strtolower($_GET['order'] ?? 'asc');
        $status = $_GET['status'] ?? null;
        $category_id = $id;
    
        $filter_parameters = [
            'page' => (int)$page,
            'limit' => (int)$limit,
            'sort' => $sort,
            'order' => $order,
            'status' => $status,
            'category_id' => $category_id,
        ];
    
        $data = $this->categoryModel_instance->todosModel($filter_parameters);
        $data_total = $this->categoryModel_instance->todosCountModel($filter_parameters);

        // ----------------- // pagination meta description
        $last_page = ceil($data_total / $limit);
        $from = ($page - 1) * $limit + 1;
        $to = min($page * $limit, $data_total);

        $meta_send = [
            'pagination' => [
                'total' => (int) $data_total,
                'per_page' => (int) $limit,
                'current_page' => (int) $page,
                'last_page' => (int) $last_page,
                'from' => $data_total ? (int) $from : null,
                'to' => $data_total ? (int) $to : null,
            ]
        ];
        // ----------------- //
    
        http_response_code(200);
        echo json_encode(['status' => 'success', 'information' => $data, 'meta' => $meta_send]);
    }

}

?>
