<?php
require_once './config/dbconnect.php';
session_start();
if (!isset($_SESSION['userID'])) {
    header("Location: login.php"); // 如果未登录，重定向到登录页面
    exit();
}

$userId = $_SESSION['userID'];
$output = []; // 初始化输出数组

// 执行 SQL SELECT
$stmt = $conn->prepare("SELECT 
            products.productID, 
            products.productName, 
            products.productQuantity, 
            products.storeName, 
            products.userID,  -- 使用 products 表中的 userID 字段
            users.full_name, 
            users.email,
            products.shoptype
        FROM products 
        JOIN users ON users.userID = products.userID
        WHERE users.userID = ?");

if (!$stmt) {
    die("Error in SQL query: " . $conn->error);
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

//secound method output json
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        // print_r($row);
        $output[] = $row;
    }
} else {
    $output['message'] = "0 results";
}

$stmt->close(); // 关闭语句
$conn->close(); // 关闭连接

header('Content-Type: application/json');

$jsonOutput = json_encode($output);

if ($jsonOutput === false) {
    die("Error encoding JSON: " . json_last_error_msg());
}

echo $jsonOutput;
?>
