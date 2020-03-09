<?php

// initializing variables
  $username = "";
$email    = "";
$errors = array(); 

$db = mysqli_connect('localhost', 'epiz_25109059', 'ye8wHBQmRh1O', 'epiz_25109059_StartUpCEO');

if (isset($_POST['reg_user'])) {
  $firstname = mysqli_real_escape_string($db, $_POST['fname']);
  $lastname = mysqli_real_escape_string($db, $_POST['lname']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $phone = mysqli_real_escape_string($db, $_POST['phone']);
  $password = mysqli_real_escape_string($db, base64_encode($_POST['password']));


  if (count($errors) == 0) {
  	$query = "INSERT INTO users (userType,email, password) 
  			  VALUES('Event creator','$email','$password')";
    mysqli_query($db, $query); // Initializing Session
   }
   if(count($errors) == 0){
    $query = mysqli_query($db,"select * from users WHERE email = '$email'");
    $result = mysqli_fetch_assoc($query);
    $userID = $result['userID'];

    $query = "INSERT INTO eventC (userID ,firstname, lastname ,phone) 
  			  VALUES('$userID','$firstname','$lastname','$phone')";
    mysqli_query($db, $query);
   }
    mysqli_close($connection); // Closing Connection

    
    header('Location: ../index.php');
					

}
