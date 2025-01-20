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
$conn->set_charset("utf8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';

    if ($action === 'login') {
        handleLogin($conn);
    } elseif ($action === 'verGanador') {
        handleVerGanador($conn);
    } elseif ($action === 'verificarNumero') {
        handleVerificarNumero($conn);
    } elseif ($action === 'cargarBono') {
        handleCargarBono($conn);
    } elseif ($action === 'bonoCancelado') {
        handleBonoCancelado($conn);
    } elseif ($action === 'habilitarBono') {
        handleHabilitarBono($conn);
    } elseif ($action === 'bonoNoParticipa') {
        handleBonoNoParticipa($conn);
    } else {
        echo json_encode(["error" => "Acción inválida"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';

    if ($action === 'estadisticas') {
        handleEstadisticas($conn);
    } elseif ($action === 'listaCargados') {
        handleListaCargados($conn);
    } elseif ($action === 'listaAptos'){
        handleListaAptos($conn);
    } elseif ($action === 'listaNoEntregados'){
        handleListaNoEntregados($conn);
    } elseif ($action === 'listaVendedores'){
        handleVendedores($conn);
    } elseif ($action === 'generarArchivo'){
        generarArchivoDatosCargados($conn);
    } elseif ($action === 'descargarArchivo'){
        descargarArchivo();
    } elseif ($action === 'bajarCargada7'){
        handleGenerarArchivoCargada7($conn);
    } else {
        echo json_encode(["error" => "Acción inválida"]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
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

function handleVerGanador($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['numero'])) {
        http_response_code(400);
        echo json_encode(["error" => "Número no proporcionado"]);
        exit();
    }

    $numero = $data['numero'];

    $stmt = $conn->prepare(
        "SELECT n1, n2, n3, n4, nombre, domicilio, dni, fono, apellido
         FROM numeros 
         LEFT JOIN vende ON numeros.vende = vende.vende 
         WHERE n1 = ? OR n2 = ? OR n3 = ? OR n4 = ?"
    );

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo preparar la declaración"]);
        exit();
    }

    $stmt->bind_param("iiii", $numero, $numero, $numero, $numero);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Bono no Vendido"]);
        exit();
    }

    $row = $result->fetch_assoc();
    $response = [
        "numeros" => implode(" * ", [$row['n1'], $row['n2'], $row['n3'], $row['n4']]),
        "nombre" => $row['nombre'],
        "domicilio" => $row['domicilio'],
        "dni" => $row['dni'],
        "fono" => $row['fono'],
        "apellido" => $row['apellido']
    ];

    echo json_encode($response);
    $stmt->close();
    exit();
}

function handleVerificarNumero($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['number'])) {
        http_response_code(400);
        echo json_encode(["error" => "Número no proporcionado"]);
        exit();
    }

    $numero = $data['number'];

    $stmt = $conn->prepare(
        "SELECT n1, n2, n3, n4, vende, nombre, domicilio, dni, fono
         FROM numeros 
         WHERE n1 = ? OR n2 = ? OR n3 = ? OR n4 = ?"
    );

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["error" => "Error en la base de datos"]);
        exit();
    }

    $stmt->bind_param("iiii", $numero, $numero, $numero, $numero);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Número no encontrado"]);
        exit();
    }

    $row = $result->fetch_assoc();

    
    if (!empty($row['nombre']) || !empty($row['domicilio']) || !empty($row['dni'])) {
        http_response_code(400);
        echo json_encode(["error" => "Bono ya vendido"]);
        exit();
    }

    $vendeStmt = $conn->prepare("SELECT apellido FROM vende WHERE vende = ?");
    $vendeStmt->bind_param("i", $row['vende']);
    $vendeStmt->execute();
    $vendeResult = $vendeStmt->get_result();
    $vendeRow = $vendeResult->fetch_assoc();

    $response = [
        "numeros" => implode(" * ", [$row['n1'], $row['n2'], $row['n3'], $row['n4']]),
        "apellido" => $vendeRow['apellido'],
        "vende" => $row['vende']
    ];

    echo json_encode($response);
    $stmt->close();
    $vendeStmt->close();
}

function handleCargarBono($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['nombre'], $data['domicilio'], $data['dni'], $data['fono'], $data['number'], $data['vende'])) {
        http_response_code(400);
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    $stmt = $conn->prepare(
        "UPDATE numeros 
        SET nombre = IF(TRIM(nombre) = '' OR nombre IS NULL, ?, nombre), 
        domicilio = IF(TRIM(domicilio) = '' OR domicilio IS NULL, ?, domicilio), 
        dni = IF(TRIM(dni) = '' OR dni IS NULL, ?, dni), 
        fono = IF(TRIM(fono) = '' OR fono IS NULL, ?, fono) 
        WHERE (n1 = ? OR n2 = ? OR n3 = ? OR n4 = ?) 
        AND vende = ?"
    );

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta"]);
        return;
    }

    $stmt->bind_param(
        "sssssiiii",
        $data['nombre'], 
        $data['domicilio'], 
        $data['dni'], 
        $data['fono'], 
        $data['number'], 
        $data['number'],
        $data['number'],
        $data['number'],
        $data['vende']
    );

    if ($stmt->execute()) {
        echo json_encode(["message" => "Bono cargado exitosamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al actualizar el bono"]);
    }

    $stmt->close();
}

function handleEstadisticas($conn) {
    $query = "SELECT * FROM numeros";
    $result = $conn->query($query);

    $response = [
        "totalCargados" => 0,
        "cargados" => 0,
        "juegan" => 0,
        "quedan" => 0,
    ];

    if ($result && $result->num_rows > 0) {
        while ($fila = $result->fetch_assoc()) {
            if ($fila["cargada"] == 1) {
                $response["totalCargados"]++;
            }
            if ($fila["cargada"] == 5) {
                $response["cargados"]++;
            }
            if ($fila["cargada"] == 7) {
                $response["juegan"]++;
            }
            if ($fila["vende"] == 1) {
                $response["quedan"]++;
            }
        }
    }

    $response["bonosEntregados"] = 2500 - $response["quedan"];
    echo json_encode($response);
    exit();
}

function handleBonoCancelado($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['numero'])) {
        http_response_code(400);
        echo json_encode(["error" => "Número no proporcionado"]);
        return;
    }

    $numero = $data['numero'];

    $sql = "UPDATE numeros SET cargada = '7' WHERE n1 = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta"]);
        return;
    }

    $stmt->bind_param("i", $numero);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Bono actualizado para participar del sorteo"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Número no encontrado o ya está en estado cargada = 7"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al actualizar el bono"]);
    }

    $stmt->close();
}

function handleHabilitarBono($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['numero'])) {
        http_response_code(400);
        echo json_encode(["error" => "Número no proporcionado"]);
        return;
    }

    $numero = $data['numero'];

    $stmtOrden = $conn->prepare("SELECT orden FROM orden WHERE valor = ?");
    if (!$stmtOrden) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta en la tabla 'orden'"]);
        return;
    }
    $stmtOrden->bind_param("i", $numero);
    $stmtOrden->execute();
    $resultOrden = $stmtOrden->get_result();

    if ($resultOrden->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Número no encontrado en la tabla 'orden'"]);
        return;
    }

    $rowOrden = $resultOrden->fetch_assoc();
    $ver = $rowOrden['orden'];

    $stmtNumeros = $conn->prepare("UPDATE numeros SET cargada = '1' WHERE n1 = ?");
    if (!$stmtNumeros) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta en la tabla 'numeros'"]);
        return;
    }
    $stmtNumeros->bind_param("i", $ver);

    if ($stmtNumeros->execute()) {
        echo json_encode(["message" => "Bono habilitado para modificar"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al habilitar el bono"]);
    }

    $stmtOrden->close();
    $stmtNumeros->close();
}

function handleBonoNoParticipa($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['numero'])) {
        http_response_code(400);
        echo json_encode(["error" => "Número no proporcionado"]);
        return;
    }

    $numero = $data['numero'];

    $stmtOrden = $conn->prepare("SELECT orden FROM orden WHERE valor = ?");
    if (!$stmtOrden) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta en la tabla 'orden'"]);
        return;
    }
    $stmtOrden->bind_param("i", $numero);
    $stmtOrden->execute();
    $resultOrden = $stmtOrden->get_result();

    if ($resultOrden->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Número no encontrado en la tabla 'orden'"]);
        return;
    }

    $rowOrden = $resultOrden->fetch_assoc();
    $ver = $rowOrden['orden'];

    $stmtNumeros = $conn->prepare("UPDATE numeros SET cargada = '5' WHERE n1 = ?");
    if (!$stmtNumeros) {
        http_response_code(500);
        echo json_encode(["error" => "Error al preparar la consulta en la tabla 'numeros'"]);
        return;
    }
    $stmtNumeros->bind_param("i", $ver);

    if ($stmtNumeros->execute()) {
        echo json_encode(["message" => "El bono ha sido marcado como NO PARTICIPA."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al actualizar el bono."]);
    }

    $stmtOrden->close();
    $stmtNumeros->close();
}

function handleListaCargados($conn) {
    $query = "SELECT n1, n2, n3, n4, nombre, fono FROM numeros WHERE cargada = 5";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener la lista de bonos cargados"]);
        exit();
    }

    $bonos = [];
    while ($row = $result->fetch_assoc()) {
        $bonos[] = $row;
    }

    echo json_encode($bonos);
    exit();
}

function handleListaAptos($conn) {
    $query = "SELECT n1, n2, n3, n4, nombre, fono FROM numeros WHERE cargada = 7";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener la lista de bonos aptos para jugar"]);
        exit();
    }

    $bonos = [];
    while ($row = $result->fetch_assoc()) {
        $bonos[] = $row;
    }

    echo json_encode($bonos);
    exit();
}

function handleListaNoEntregados($conn) {
    $query = "SELECT n1, n2, n3, n4, nombre, fono FROM numeros WHERE cargada = 1";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener la lista de bonos NO Entregados"]);
        exit();
    }

    $bonos = [];
    while ($row = $result->fetch_assoc()) {
        $bonos[] = $row;
    }

    echo json_encode($bonos);
    exit();
}

function handleVendedores($conn) {
    $query = "SELECT apellido, vende FROM vende";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener la lista de vendedores"]);
        exit();
    }

    $vendedores = [];
    while ($row = $result->fetch_assoc()) {
        $vendedores[] = $row;
    }

    echo json_encode($vendedores);
    exit();
}

function generarArchivoDatosCargados($conn) {
    $query = "SELECT n1, n2, n3, n4, nombre, fono FROM numeros WHERE cargada = 5";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error al generar el archivo de datos cargados"]);
        exit();
    }

    $file = 'datos.txt';
    $jump = "\r\n";
    $separator = "\t";

    $fp = fopen($file, 'w');

    $header = 'N°1' . $separator . 'N°2' . $separator . 'N°3' . $separator . 'N°4' . $separator . 'Apellido' . $separator . 'Celular' . $jump;
    fwrite($fp, $header);

    while ($row = $result->fetch_assoc()) {
        $line = $row['n1'] . $separator . $row['n2'] . $separator . $row['n3'] . $separator . $row['n4'] . $separator . $row['nombre'] . $separator . $row['fono'] . $jump;
        fwrite($fp, $line);
    }

    fclose($fp);
    chmod($file, 0777);

    echo json_encode(["message" => "Archivo generado exitosamente", "file" => $file]);
    exit();
}

function descargarArchivo() {
    $file = 'datos.txt';

    if (!file_exists($file)) {
        http_response_code(404);
        echo json_encode(["error" => "El archivo no existe"]);
        exit();
    }

    header('Content-Description: File Transfer');
    header('Content-Type: text/plain');
    header('Content-Disposition: attachment; filename=' . basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    exit();
}

function handleGenerarArchivoCargada7($conn) {
    $query = "SELECT * FROM numeros WHERE cargada = 7";
    $result = $conn->query($query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener los datos cargados"]);
        exit();
    }

    $fecha = date('d-m-Y');
    $fileName = $fecha . '.txt';

    $jump = "\r\n";
    $separator = "\t";

    $fileContent = 'N°1' . $separator . 'N°2' . $separator . 'N°3' . $separator . 'N°4' . $separator . 'Apellido' . $separator . 'Celular' . $separator . 'Cargada' . $jump;

    while ($row = $result->fetch_assoc()) {
        $fileContent .= $row['n1'] . $separator . $row['n2'] . $separator . $row['n3'] . $separator . $row['n4'] . $separator . $row['nombre'] . $separator . $row['fono'] . $separator . $row['cargada'] . $jump;
    }

    header('Content-Description: File Transfer');
    header('Content-Type: text/plain');
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    header('Content-Length: ' . strlen($fileContent));
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: 0');

    echo $fileContent;
    exit();
}

?>