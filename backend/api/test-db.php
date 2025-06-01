<?php
$dsn = "mysql:host=localhost;port=3306;dbname=medicare";
$user = "root";
$pass = "";

try {
    $pdo = new PDO($dsn, $user, $pass);
    echo "✅ Connected to DB successfully.";
} catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
