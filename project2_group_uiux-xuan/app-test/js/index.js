// Declare productList globally
const productList = [];

// Function to check if the user is logged in
async function isLoggedIn() {
    try {
        const response = await fetch('check_login.php');
        const data = await response.json();
        // console.log(data, 'response');
        displayProductList();
        return data.logged_in;
    } catch (error) {
        console.error(error);
        return false;
    }

}

function showPopup(message) {
    const popup = document.getElementById('customPopup');
    const overlay = document.getElementById('overlay');
    const popupMessage = document.getElementById('popupMessage');

    // Set the message
    popupMessage.innerText = message;

    // Display the popup and overlay
    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Automatically hide the popup after 3000 milliseconds (adjust the time as needed)
    setTimeout(function () {
        hidePopup();
    }, 800);
}

// Function to hide the custom popup
function hidePopup() {
    const popup = document.getElementById('customPopup');
    const overlay = document.getElementById('overlay');

    // Hide the popup and overlay
    popup.style.display = 'none';
    overlay.style.display = 'none';
}


async function updateProductList(products) {
    // console.log('Updating product list:', products);

    var productListElement = document.getElementById("productList");
    productListElement.innerHTML = ''; // Clear the existing list

    // Create a new list with edit and delete buttons
    products.forEach(function (product) {
        var listItem = document.createElement('li');
        listItem.classList.add('tobuy');

        listItem.innerHTML = `
            ${product.productName} (Quantity: ${product.productQuantity}, Store: ${product.storeName}, Shop Type: ${product.shoptype})
            <button onclick="editProduct(${product.productID})"><i class="fa-solid fa-pen"></i></button>
            <button onclick="deleteProduct(${product.productID})"><i class="fa-solid fa-trash"></i></button>
            <button id="product_${product.productID}" class="completed-btn" onclick="markProduct(${product.productID})"><i class="fa-regular fa-circle-check"></i></button>
        `;

        productListElement.appendChild(listItem);
    });

    // Update the global productList array
    if (!Array.isArray(productList)) {
        // console.error('productList is not an array:', productList);
        productList = []; // Reset productList to an empty array
    }

    productList.length = 0; // Clear existing products
    productList.push(...products); // Add new products

    // console.log('Updated product list:', productList);
}



async function fetchProductList() {
    const response = await fetch('select.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const products = await response.json();

    return products;
}

async function displayProductList() {
    try {
        // Check if the user is logged in
        var loggedIn = await isLoggedIn();
        console.log(loggedIn, "loggedIn");

        if (!loggedIn) {
            // Optionally, you can show a message or perform other actions
            console.log("User is not logged in. Displaying product list is skipped.");
            return;
        }

        // Fetch the product list
        const products = await fetchProductList();
        console.log('Products:', products);

        // Update the product list in the HTML
        updateProductList(products);
    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}


// Function to add a new product
async function addProduct() {
    try {
        // Check if the user is logged in
        var loggedIn = await isLoggedIn();

        if (!loggedIn) {
            window.location.href = 'login.php'; // Redirect to login page if not logged in
            return;
        }

        var productName = document.getElementById("productName").value.trim();
        var productQuantityInput = document.getElementById("productQuantity");
        var productQuantity = parseFloat(productQuantityInput.value.trim());
        var storeName = document.getElementById("storeName").value.trim();
        var shoptype = document.getElementById("shoptype").value;

        if (!productName || isNaN(productQuantity) || productQuantity <= 0) {
            showPopup('Please fill in the required fields with valid values.');
            return;
        }

        // Check if the product already exists in the local list
        if (productList.find(item => item.productName === productName && item.storeName === storeName && item.shoptype === shoptype)) {
            showPopup('This data already exists in the list.');
            return;
        }

        // Make a fetch request to add the product
        var response = await fetch('insert.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: productName,
                productQuantity: productQuantity,
                storeName: storeName,
                shoptype: shoptype
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        var data = await response.json();
        console.log(data.message);

        // Refresh the product list after adding
        const products = await fetchProductList();
        updateProductList(products);


        // Clear input fields
        document.getElementById("productName").value = '';
        productQuantityInput.value = '';
        document.getElementById("storeName").value = '';
        document.getElementById("shoptype").value = 'online';
        console.log('Before showPopup'); // Add this line
        // Show the success popup after everything is done
        showPopup('Product added!');
        console.log('After showPopup'); // Add this line

    } catch (error) {
        console.error('Error adding product:', error);
    }
}


// Function to delete a product
async function deleteProduct(productId) {
    console.log(productId, "productId");
    const confirmDelete = confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) {
        return; // If the user cancels the deletion, do nothing
    }
    try {
        // Check if the user is logged in
        if (!await isLoggedIn()) {
            window.location.href = 'login.php'; // Redirect to login page if not logged in
            return;
        }

        // Make a fetch request to delete the product
        const response = await fetch('delete.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData.message, "aaa");
        displayProductList(); // Refresh the product list after deletion
        showPopup('Product list delete successfully!');
    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}


async function editProduct(productId) {
    //  console.log(productId,"productId111")
    try {
        // Fetch current product details
        const productDetailsResponse = await fetch(`select.php?productId=${productId}`, {
            method: 'GET', // Make sure to explicitly specify the method
        });

        const productDetails = await productDetailsResponse.json();
        // console.log('Product Details:', productDetails);

        if (
            productDetails &&
            productDetails.length > 0 &&
            productDetails[0].productName !== undefined &&
            productDetails[0].productQuantity !== undefined &&
            productDetails[0].storeName !== undefined &&
            productDetails[0].shoptype !== undefined
        ) {
            // Populate the form with current product details
            document.getElementById('productName').value = productDetails[0].productName;
            document.getElementById('productQuantity').value = productDetails[0].productQuantity;
            document.getElementById('storeName').value = productDetails[0].storeName;
            document.getElementById('shoptype').value = productDetails[0].shoptype;

            // Change the button to Update
            document.getElementById('submitBtn').innerText = 'Update';
            document.getElementById('submitBtn').onclick = function () {
                updateProduct(productId);
            };
        } else {
            console.error('Incomplete or missing product details.');
        }
    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}



// Function to update an existing product
async function updateProduct(productId) {
    console.log(productId, "productId")
    try {
        // Get updated data from the form
        const updatedData = {
            productName: document.getElementById('productName').value,
            productQuantity: document.getElementById('productQuantity').value,
            storeName: document.getElementById('storeName').value,
            shoptype: document.getElementById('shoptype').value,
        };

        //     // Make a fetch request to update the product
        const response = await fetch('update.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                updatedData: updatedData,
            }),
        });

        const responseData = await response.json();
        console.log(responseData.message);

        // Refresh the product list after updating
        displayProductList();

        // Clear form fields
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('storeName').value = '';
        document.getElementById('shoptype').value = '';

        // Change the button back to Add
        document.getElementById('submitBtn').innerText = 'Add';
        document.getElementById('submitBtn').onclick = addProduct;
        // Show a success alert
        // Show a success popup
        showPopup('Product list updated successfully!');
    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}


//mark completed
async function markProduct(productId) {
    // console.log(productId, "productId")
    try {
        // Check if the user is logged in
        const loggedIn = await isLoggedIn();

        if (!loggedIn) {
            window.location.href = 'login.php'; // Redirect to login page if not logged in
            return;
        }

        const listItem = document.getElementById(`product_${productId}`);
        listItem.classList.toggle('completed');

    } catch (error) {
        console.error(error);
        // Handle error if needed
    }
}

// Attach the displayProductList function to an event (e.g., page load)
document.addEventListener('DOMContentLoaded', displayProductList);
