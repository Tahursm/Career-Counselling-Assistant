<?php
include 'dbconnection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve and sanitize form inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $password = password_hash(trim($_POST['password']), PASSWORD_BCRYPT);

    // Prepare the SQL query with placeholders to prevent SQL injection
    $query = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");

    // Bind the parameters to the placeholders
    $query->bindParam(':name', $name);
    $query->bindParam(':email', $email);
    $query->bindParam(':password', $password);

    try {
        // Execute the query
        $query->execute();
        echo "Registration successful!";
        
        echo '<a href="http://localhost/tahur1/index.html">Back to Home</a>';
    } catch (PDOException $e) {
        // Catch and display database-related errors
        echo "Error: " . $e->getMessage();
    }
}
?>
