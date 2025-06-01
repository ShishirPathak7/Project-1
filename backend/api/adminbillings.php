<?php
require_once 'cors.php';

header('Content-Type: application/json');

$host = 'localhost';
$db = 'medicare';
$user = 'root';
$pass = ''; // Adjust if needed
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);

  // Handle POST to insert billing record
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (
      isset($input['name']) &&
      isset($input['date']) &&
      isset($input['purpose']) &&
      isset($input['amount'])
    ) {
      $stmt = $pdo->prepare("INSERT INTO patient_billing (name, amount, date, purpose) VALUES (?, ?, ?, ?)");
      $stmt->execute([
        $input['name'],
        $input['amount'],
        $input['date'],
        $input['purpose']
      ]);

      echo json_encode(['status' => 1, 'message' => 'Billing entry added']);
    } else {
      echo json_encode(['status' => 0, 'message' => 'Missing required fields']);
    }
    exit;
  }

  // Handle GET to fetch billing records
  $patients = $pdo->query("SELECT name, amount, date, purpose FROM patient_billing")->fetchAll();

  echo json_encode([
    'patients' => $patients
  ]);

} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
