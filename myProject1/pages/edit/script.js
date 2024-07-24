document.getElementById('cancel-btn').addEventListener('click', function() {
    // Redirect to the manage shipments page or perform any other cancel action
    window.location.href = 'manage-shipments.html';
});

document.getElementById('edit-shipment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Save the shipment details here, e.g., via an AJAX request
    alert('Shipment details saved successfully!');
    // Redirect to the manage shipments page or update the current page
    window.location.href = 'manage-shipments.html';
});
