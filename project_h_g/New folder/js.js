// Process the purchase form submission
document.getElementById("purchaseForm").addEventListener("submit", function (event) {
event.preventDefault();

// Get the form data
    var formData = new FormData(this);

    // Send an AJAX request to the PHP back end to process the purchase record
    sendAjaxRequest("POST", "process_purchase.php", formData, function (response) {
    // Process the purchase success or failure response
    console.log(response);

    // Refresh or update the data presentation section
    //...
});


// Process data deletion
        function deletePurchase(purchaseID) {
            // Send an AJAX request to the PHP back end to process the delete record
            sendAjaxRequest("POST", "delete_purchase.php", { purchaseID: purchaseID }, function (response) {
            // Handle the deletion success or failure response
            console.log(response);

            // Refresh or update the data presentation section
            //...
            });
        }

    // Send the AJAX request function
    function sendAjaxRequest(method, url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Request successful
                    callback(xhr.responseText);
                } else {
                    // Request failed
                    console.error("Error:", xhr.status);
                }
            }
        };

        if (method === "POST") {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        //Converts FormData to URL-encoded form
        var encodedData = "";
        for (var pair of data.entries()) {
            encodedData += encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]) + "&";
        }

        encodedData = encodedData.slice(0, -1);

        //Send request
        xhr.send(encodedData);
    }
});
