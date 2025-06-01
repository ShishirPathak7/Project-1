<?php
class DbConnect {
    private $server = 'localhost';
    private $dbname = 'medicare';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO("mysql:host={$this->server};port=3306;dbname={$this->dbname}", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 0, 'message' => 'DB error: ' . $e->getMessage()]);
            exit;
        }
    }
}
?>
