<?php
//insert.php
function getConnection()
{
    $params = array(
        'host' => 'localhost',
        'dbname' => 'angularjs',
        'user' => 'root',
        'password' => ''
    );

    $dsn = "mysql:host={$params['host']};dbname={$params['dbname']}";
    $db = new PDO($dsn, $params['user'], $params['password']);
    $db->exec("set names utf8"); //cp1251

    return $db;
}
$db = getConnection();

$sql = "SELECT * FROM tbl_user";
$result = $db->prepare($sql);
$result->execute();

$i = 0;
$newsList = array();
while ($row = $result->fetch()) {
    $newsList[$i]['age'] = $row['age'];
    $newsList[$i]['id'] = $row['id'];
    $newsList[$i]['imageUrl'] = $row['imageUrl'];
    $newsList[$i]['name'] = $row['name'];
    $newsList[$i]['snippet'] = $row['snippet'];
    $i++;
}
echo json_encode($newsList);
?>