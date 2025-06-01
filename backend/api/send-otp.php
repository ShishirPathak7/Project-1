<?php
function safe_ob_clean() {
    if (ob_get_length()) ob_end_clean();
}
ob_start();
header('Content-Type: application/json');

// Set timezone
date_default_timezone_set('Australia/Sydney');

require_once 'cors.php';
require_once 'email_config.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// DB connection
class DbConnect {
    private $server = 'localhost';
    private $port = '3306';
    private $dbname = 'medicare';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO("mysql:host={$this->server};port={$this->port};dbname={$this->dbname}", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            http_response_code(500);
            safe_ob_clean();
            echo json_encode(['status' => 0, 'message' => 'DB error: ' . $e->getMessage()]);
            exit();
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

// Get email input
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';

if (empty($email)) {
    safe_ob_clean();
    echo json_encode(['status' => 0, 'errors' => ['email' => 'Email is required']]);
    exit();
}

// Check if user exists
$stmt = $conn->prepare("SELECT * FROM tblusers WHERE Email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    safe_ob_clean();
    echo json_encode(['status' => 0, 'errors' => ['email' => 'User not found']]);
    exit();
}

// Decide whether to reuse or regenerate OTP
$otp = '';
$timestamp = '';

if (!empty($user['mfa_timestamp'])) {
    $elapsed = time() - strtotime($user['mfa_timestamp']);
    if ($elapsed < 900) {
        // Reuse existing OTP if not expired
        $otp = $user['code'];
        $timestamp = $user['mfa_timestamp'];
    } else {
        // Generate new OTP
        $otp = random_int(100000, 999999);
        $timestamp = date('Y-m-d H:i:s');

        $update = $conn->prepare("UPDATE tblusers SET code = :otp, mfa_timestamp = :ts WHERE Email = :email");
        $update->bindParam(':otp', $otp);
        $update->bindParam(':ts', $timestamp);
        $update->bindParam(':email', $email);
        $update->execute();
    }
} else {
    // First time sending OTP
    $otp = random_int(100000, 999999);
    $timestamp = date('Y-m-d H:i:s');

    $update = $conn->prepare("UPDATE tblusers SET code = :otp, mfa_timestamp = :ts WHERE Email = :email");
    $update->bindParam(':otp', $otp);
    $update->bindParam(':ts', $timestamp);
    $update->bindParam(':email', $email);
    $update->execute();
}

// Send email
$mail = new PHPMailer(true);
try {
    // $mail->SMTPDebug = 2; // Uncomment for debug logs

    $mail->isSMTP();
    $mail->Host       = $email_config['smtp_host'];
    $mail->SMTPAuth   = $email_config['smtp_auth'];
    $mail->Username   = $email_config['smtp_username'];
    $mail->Password   = $email_config['smtp_password'];
    $mail->SMTPSecure = $email_config['smtp_secure'];
    $mail->Port       = $email_config['smtp_port'];

    $mail->setFrom($email_config['from_email'], $email_config['from_name']);
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Your MFA Verification Code';
    $mail->Body    = "<p>Your verification code is: <strong>$otp</strong></p><p>This code will expire in 15 minutes.</p>";

    $mail->send();
    safe_ob_clean();
    echo json_encode(['status' => 1, 'message' => 'OTP sent to email']);
} catch (Exception $e) {
    safe_ob_clean();
    echo json_encode(['status' => 0, 'message' => 'Email error: ' . $mail->ErrorInfo]);
}
?>
