<?php
ob_start();
header('Content-Type: application/json');
require_once 'cors.php';
require_once 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$data = json_decode(file_get_contents('php://input'));
$email = isset($data->email) ? trim(strtolower($data->email)) : '';
$otp = isset($data->otp) ? trim($data->otp) : '';

if (empty($email) || empty($otp)) {
    ob_get_length() && ob_end_clean();
    echo json_encode(['status' => 0, 'message' => 'Email and OTP are required']);
    exit();
}

$stmt = $conn->prepare("SELECT * FROM tblusers WHERE Email = :email AND code = :otp");
$stmt->bindParam(':email', $email);
$stmt->bindParam(':otp', $otp);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $now = new DateTime();
    $expiresAt = new DateTime($user['mfa_timestamp']);
    if ($now < $expiresAt->modify('+15 minutes')) {
        // Mark verified
        $conn->prepare("UPDATE tblusers SET status = 'verified', code = NULL, mfa_timestamp = NULL WHERE Email = :email")
              ->execute([':email' => $email]);

        ob_get_length() && ob_end_clean();
        echo json_encode([
            'status' => 1,
            'message' => 'OTP verified successfully',
            'ID' => $user['ID'],
            'UserType' => $user['UserType']
        ]);
    } else {
        ob_get_length() && ob_end_clean();
        echo json_encode(['status' => 0, 'message' => 'OTP expired']);
    }
} else {
    ob_get_length() && ob_end_clean();
    echo json_encode(['status' => 0, 'message' => 'Invalid OTP']);
}
