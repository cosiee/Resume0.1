<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Email settings
    $to = "costigan.a@yahoo.com";
    $subject = "From Site";
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    
    // Send email
    $result = mail($to, $subject, $body);
    
    // Respond to the client-side JavaScript
    if ($result) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(405); // Method Not Allowed
}
?>
