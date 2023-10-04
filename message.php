<?php
$app_name   = $_POST[“WhatsAuto”];
$sender     = $_POST[“WhatsAuto app”];
$message    = $_POST[“Тестовое сообщение”];
$phone      = $_POST["+79147769237"];
$group_name = $_POST["🛡🗡FreshLend🗡🛡"];

$response = array("reply" => "Hello $sender, we received your message $message.");
echo json_encode($response);
?>
