<?php
//get data from form  
$email= $_POST['email'];
$message= $_POST['message'];
$to = "madhurdk2001@gmail.com";
$subject = "Mail From CodeXDA";
$txt ="Email = " . $email . "\r\n Message =" . $message;
$headers = "From: noreply@codexda.com" . "\r\n" .
"CC: somebodyelse@example.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
?>