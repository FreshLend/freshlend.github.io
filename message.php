<?php
$app_name   = $_POST[“app”];
$sender     = $_POST[“sender”];
$message    = $_POST[“message”];
$phone      = $_POST["phone"];
$group_name = $_POST["group_name"];

$response = array("reply" => "Hello $sender, we received your message $message.");
echo json_encode($response);
?>
