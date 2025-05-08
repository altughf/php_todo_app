<?php

class CategoryController {

    private $categoryModel_instance;

    public function __construct(){

        require_once APPROOT . '/Models/CategoryModel.php';
        $this->categoryModel_instance = new CategoryModel;
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

}

?>
