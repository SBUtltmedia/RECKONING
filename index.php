<!DOCTYPE html>
<html>

<body>

    <form action="index.php" method="post" enctype="multipart/form-data">
        Select image to upload:
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Upload Image" name="submit">
        Enter your title:
        <input  name="title" id="title">
    </form>
    <?php
    if (!empty($_POST)){
$user=$_SERVER['cn'].rand(1, 99999);
#$user=$_SERVER['cn'];
$target_dir = "users/$user/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    print_r($check);
    $uploadOk = 1;
    $original_name=basename($_FILES["fileToUpload"]["name"]);
    $original_path="$target_dir$original_name";
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $original_path)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
      $outputLarge= `convert "$original_path" -resize 1600x1600! "${target_dir}large.png"`;
      $outputThumb= `convert "$original_path" -resize 400x400! "${target_dir}thumb.png"`;
      unlink ($original_path);
      $info=json_decode("{}");
      $info->first=$_SERVER['nickname'];
      $info->last=$_SERVER['sn'];
      $info->netid=$user;
      file_put_contents("${target_dir}info.json",json_encode($info));
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
  } else {
    echo $check;
    $uploadOk = 0;
  }
}
    }
?>




</body>

</html>