<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <style>
        body, h1, h2, p, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: #4CAF50;
        }

        /* Header styles */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #4CAF50; /* Green background color, you can change this */
            padding: 10px 20px;
        }

        header img {
            height: 50px;
        }

        header div {
            color: #fff; /* White text color, you can change this */
        }

        header a {
            color: #fff; /* White text color, you can change this */
            text-decoration: none;
            margin-left: 10px;
        }

        /* Form styles */
        form {
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff; /* White background color, you can change this */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        input, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #4CAF50; /* Green background color, you can change this */
            color: #fff; /* White text color, you can change this */
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049; /* Darker green color on hover, you can change this */
        }
        .cursor{
            width: 3rem;
            height: 3rem;
            border: 3px solid #ffffff;
            border-radius: 50%;
            position: fixed;
            transform: translate(-50%, -50%);
            pointer-events: none;
            transform-origin: 100% 100%;
            mix-blend-mode: difference;
            z-index: 6;
            }

        #productList {
            text-align: center;
            list-style: none;
            padding: 0;
        }

        #productList li {
            margin-bottom: 10px;
        }

        /* home-intro-text CSS */
        .home-intro-text {
            text-align: center;
            margin-bottom: 20px;
        }

        .muri-medi-text {
            display: inline;
            margin: 0;
        }

        .text {
            display: inline;
            margin: 0;
            font-weight: normal;
            color: #555; /* Change the color as needed */
            font-size: 1.2em; /* Adjust the font size as needed */
        }

    </style>
</head>

<body>
<div class='cursor'></div>
<header>
    <img src="path/to/your/logo.png" alt="Logo" style="height: 50px;">

    <div id="user-info">
        <?php
            session_start();
            if (isset($_SESSION["user"])) {
                echo "Hello, " . $_SESSION["user"] . "! | <a href='logout.php'>Logout</a>";
            } else {
                echo "<a href='register.php'>Register</a> | <a href='login.php'>Login</a>";
            }
        ?>
    </div>
</header>

    <form id="productForm">
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" required>

        <label for="productQuantity">Product Quantity:</label>
        <input type="number" id="productQuantity" name="productQuantity" required>

        <label for="storeName">Store Name:</label>
        <input type="text" id="storeName" name="storeName" required>

        <label for="shoptype">Shop Type:</label>
        <select id="shoptype" name="shoptype" required>
            <option value="online">Online Shopping</option>
            <option value="offline">Offline Shopping</option>
        </select>

        <button type="button" onclick="addProduct()">Add Product</button>
    </form>
    <ul id="productList"></ul>
<script src="./js/index.js"></script>

<script>


</script>
<script src="./js/gsap.min.js"></script>

</body>

</html>