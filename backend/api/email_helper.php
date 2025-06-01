<?php
require_once 'email_config.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

function sendEmail($to, $subject, $message, $from_email = null, $from_name = null) {
    global $email_config;

    // Set sender information
    $from_email = $from_email ?? $email_config['from_email'];
    $from_name = $from_name ?? $email_config['from_name'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = $email_config['debug']; // 0 = off, 2 = verbose output
        $mail->isSMTP();
        $mail->Host = $email_config['smtp_host'];
        $mail->SMTPAuth = $email_config['smtp_auth'];
        $mail->Username = $email_config['smtp_username'];
        $mail->Password = $email_config['smtp_password'];
        $mail->SMTPSecure = $email_config['smtp_secure'];
        $mail->Port = $email_config['smtp_port'];

        // Sender and recipient
        $mail->setFrom($from_email, $from_name);
        $mail->addAddress($to);

        // Content
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body = $message;

        // Send the email
        $mail->send();
        return true;
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}"; // Display the error
        error_log("Email sending failed: {$mail->ErrorInfo}");
        return false;
    }
}
?>
