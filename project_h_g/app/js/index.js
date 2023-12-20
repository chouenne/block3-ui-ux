// // Function to check if the user is logged in
function isLoggedIn() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'check_login.php', true); // 使用异步方式
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response, "response");
                resolve(response.logged_in);
            } else {
                reject(false);
            }
        };

        xhr.onerror = function () {
            reject(false);
        };

        xhr.send();
    });
}


// // Function to display the product list
async function displayProductList() {
    try {
        // Check if the user is logged in
        var loggedIn = await isLoggedIn();
        console.log(loggedIn,"loggedIn")

        if (!loggedIn) {
            // Optionally, you can show a message or perform other actions
            console.log("User is not logged in. Displaying product list is skipped.");
            return;
        }

        // User is logged in, continue with the rest of the logic

        // Make an AJAX request to fetch the product list
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'select.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var products = JSON.parse(xhr.responseText);
                updateProductList(products);
            }
        };
        xhr.send();
    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}


// // Function to update the product list in the HTML
// Function to update the product list in the HTML
async function updateProductList(products) {
    var productList = document.getElementById("productList");
    productList.innerHTML = ''; // Clear the existing list

    // Check if the user is logged in
    var loggedIn = await isLoggedIn();

    // Create a new list with edit and delete buttons
    products.forEach(async function (product) {
        var listItem = document.createElement('li');

        listItem.innerHTML = `
            ${product.productName} (Quantity: ${product.productQuantity}, Store: ${product.storeName}, Shop Type: ${product.shoptype})
            ${loggedIn ? `<button onclick="await editProduct(${product.productID})">Edit</button>` : ''}
            ${loggedIn ? `<button onclick="await deleteProduct(${product.productID})">Delete</button>` : ''}
        `;

        productList.appendChild(listItem);
    });
}


// Function to add a new product
// Function to add a new product
async function addProduct() {
    try {
        // Check if the user is logged in
        var loggedIn = await isLoggedIn();

        if (!loggedIn) {
            window.location.href = 'login.php'; // Redirect to login page if not logged in
            return;
        }

        var productName = document.getElementById("productName").value;
        var productQuantity = document.getElementById("productQuantity").value;
        var storeName = document.getElementById("storeName").value;
        var shoptype = document.getElementById("shoptype").value;

        // Make an AJAX request to add the product
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'insert.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response.message);
                displayProductList(); // Refresh the product list after adding
            }
        };

        var data = {
            productName: productName,
            productQuantity: productQuantity,
            storeName: storeName,
            shoptype: shoptype
        };

        xhr.send(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}




// // Function to delete a product
function deleteProduct(productId) {
    // Check if the user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.php'; // Redirect to login page if not logged in
        return;
    }

    // Make an AJAX request to delete the product
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response.message);
            displayProductList(); // Refresh the product list after deletion
        }
    };
    var data = { productId: productId };
    xhr.send(JSON.stringify(data));
}

// // Attach the displayProductList function to an event (e.g., page load)
document.addEventListener('DOMContentLoaded', displayProductList);
