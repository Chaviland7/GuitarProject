<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$root_string = $request->root_string;
@$root_fret = $request->root_fret;

$conn = new mysqli("localhost", "root", "root", "guitar");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$result = $conn->query("SELECT note FROM string_notes WHERE string = $root_string and fret = $root_fret");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Note":"'. $rs["note"]     . '"}';
}
$outp ='{"records":'.$outp.'}';
$conn->close();

echo($outp);
?>
