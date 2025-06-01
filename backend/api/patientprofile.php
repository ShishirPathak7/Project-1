<?php
require_once 'cors.php';
require_once 'DbConnect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['status' => 0, 'message' => 'Only GET method is allowed']);
    exit();
}

$userId = $_GET['userId'] ?? null;

if (!$userId || !is_numeric($userId)) {
    http_response_code(400);
    echo json_encode(['status' => 0, 'message' => 'Invalid userId']);
    exit();
}

try {
    $db = new DbConnect();
    $conn = $db->connect();

    $stmt = $conn->prepare("SELECT FirstName, LastName, Email, ID, ContactNumber, UserType FROM tblusers WHERE ID = :id AND UserType = 'Patient'");
    $stmt->bindParam(':id', $userId);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(['status' => 1, 'user' => $user]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Patient not found']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
