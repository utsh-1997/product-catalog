<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$port = getenv('DB_PORT');

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname",
        $username,
        $password,
        [PDO::MYSQL_ATTR_SSL_CA => true,
         PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false]
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Step 1 - create table
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL
    )");

    echo json_encode(["success" => true, "message" => "Table created successfully"]);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage(), "step" => "create table"]);
}
?>