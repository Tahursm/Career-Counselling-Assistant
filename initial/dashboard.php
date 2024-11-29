<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit;
}

echo "Welcome to your dashboard!";
echo '<a href="http://localhost/tahur1/index.html">Go back to Home Page</a>';
?>
