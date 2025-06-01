<?php
require_once 'cors.php';
require_once 'DbConnect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'));
$email = isset($data->email) ? trim(strtolower($data->email)) : '';
$otp = isset($data->otp) ? trim($data->otp) : '';

if (empty($email) || empty($otp)) {
    echo json_encode(['status' => 0, 'message' => 'Email and OTP are required']);
    exit;
}

$db = new DbConnect();
$conn = $db->connect();

$stmt = $conn->prepare("SELECT ID, UserType, code, mfa_timestamp FROM tblusers WHERE Email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$currentTime = date('Y-m-d H:i:s');

if ($user) {
    if ($user['code'] == $otp && $user['mfa_timestamp'] > $currentTime) {
        $reset = $conn->prepare("UPDATE tblusers SET code = 0, mfa_timestamp = NULL WHERE Email = :email");
        $reset->bindParam(':email', $email);
        $reset->execute();

        echo json_encode([
            'status' => 1,
            'message' => 'OTP verified',
            'UserType' => $user['UserType'],
            'ID' => $user['ID']
        ]);
    } elseif ($user['mfa_timestamp'] <= $currentTime) {
        echo json_encode(['status' => 0, 'message' => 'OTP has expired']);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Invalid OTP']);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'User not found']);
}
?>
