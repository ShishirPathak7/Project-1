<?php
require_once 'cors.php';

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'medicare';  // ✅ Your actual DB name
    private $user = 'root';        // ✅ Your DB user
    private $pass = '';            // ✅ Your DB password

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database Error: ' . $e->getMessage()]);
            exit;
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    $data = [];

    try {
        // Total Patients
        $stmtPatients = $conn->prepare("SELECT COUNT(*) FROM tblusers WHERE UserType = 'Patient'");
        $stmtPatients->execute();
        $data['TotalPatientCount'] = $stmtPatients->fetchColumn();

        // Total Appointments
        $stmtAppointments = $conn->prepare("SELECT COUNT(*) FROM appointments");
        $stmtAppointments->execute();
        $data['TotalAppointmentCount'] = $stmtAppointments->fetchColumn();

        // Total Pharmacists
        $stmtPharmacists = $conn->prepare("SELECT COUNT(*) FROM tblusers WHERE UserType = 'Pharmacist'");
        $stmtPharmacists->execute();
        $data['TotalPharmacistCount'] = $stmtPharmacists->fetchColumn();

        echo json_encode($data);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Query Error: ' . $e->getMessage()]);
    }
}
?>
