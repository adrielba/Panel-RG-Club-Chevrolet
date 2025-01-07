<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
	http_response_code(200);
	exit();
}

function loadEnv($file = '.env'){
	if(!file_exists($file)){
		die(json_encode(["error" => "archivo .env no encontrado"]));
	}

	$env = parse_ini_file($file);
	if(!$env){
		die(json_encode(["error" => "Failed to parse .env file"]));
	}

	return $env;
}

$env = loadEnv();

$conn = new mysqli($env['DB_HOST'], $env['DB_USER'], $env['DB_PASS'], $env['DB_NAME']);

if($conn->connect_error){
	die(json_encode(["error" => "Conexión a la Base de Datos Fallida: ", $conn->connect_error]));
	exit();
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$action = $_GET['action'] ?? '';

	if($action === 'login'){
		handleLogin($conn);
	} else {
		echo json_encode(["error" => "Acción Invalida"]);
	}

}

function handleLogin($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['usuario']) || !isset($data['contraseña'])) {
        http_response_code(400);
        echo json_encode(["error" => "Falta Usuario o Contraseña"]);
        exit();
    }

    $usuario = $data['usuario'];
    $contraseña = $data['contraseña'];

    $stmt = $conn->prepare("SELECT contraseña FROM chivousers WHERE usuario = ?");
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo preparar la declaración"]);
        exit();
    }

    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(["error" => "Usuario o Contraseña Invalidos"]);
        $stmt->close();
        exit();
    }

    $row = $result->fetch_assoc();
    $hashedPassword = $row['contraseña'];

    if (password_verify($contraseña, $hashedPassword)) {
        echo json_encode(["message" => "Ingreso Exitoso"]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Usuario o Contraseña Invalidos"]);
    }

    $stmt->close();
    exit();
}

?>