<?php
require_once 'cors.php';

header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'medicare';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 0, 'message' => 'Internal Server Error']);
            exit;
        }
    }
}

// Instantiate DB connection
$db = new DbConnect();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = isset($_GET['userId']) ? intval($_GET['userId']) : 0;

    if ($userId <= 0) {
        http_response_code(400);
        echo json_encode(['status' => 0, 'message' => 'Invalid or missing userId']);
        exit();
    }

    try {
        $stmt = $conn->prepare("SELECT FirstName, LastName, Email, ID, ContactNumber, UserType 
                                FROM tblusers 
                                WHERE ID = :id AND UserType = 'Admin'");
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode(['status' => 1, 'user' => $user]);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 0, 'message' => 'Admin user not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 0, 'message' => 'Method Not Allowed']);
}
?>
