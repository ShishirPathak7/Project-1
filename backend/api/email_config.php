<?php
// SMTP Configuration
$email_config = [
    // SMTP Server Settings
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',

    // Authentication
    'smtp_auth' => true,
    'smtp_username' => 'pathakshishir1@gmail.com', // ✅ Replace with your Gmail
    'smtp_password' => 'wxhl htcr bscs uvrc',    // ✅ Replace with Gmail App Password

    // Sender Information
    'from_email' => 'pathakshishir1@gmail.com',    // ✅ Must match the Gmail above
    'from_name' => 'IUS Medical Clinic',        // ✅ This is what users will see

    // Debug Level (0 = off, 1 = client messages, 2 = full debug)
    'debug' => 0
];
?>
