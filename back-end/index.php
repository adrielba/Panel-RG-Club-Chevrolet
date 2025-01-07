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
}

echo json_encode(["message" => "Conexión a la Base de Datos Exitosa"]);


?>