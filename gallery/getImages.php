<?php
$gallery=array();
foreach (glob("../users/*/info.json") as $filename) {
    array_push ($gallery,json_decode(file_get_contents($filename)));
}
print (json_encode($gallery));
?>
