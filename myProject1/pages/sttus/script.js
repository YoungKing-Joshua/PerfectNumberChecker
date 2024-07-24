document.getElementById('back-btn').addEventListener('click', function() {
    // Redirect to the manage shipments page or perform any other back action
    window.location.href = 'manage-shipments.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');
    const statusText = statusElement.textContent.trim().toLowerCase();

    switch (statusText) {
        case 'pending':
            statusElement.classList.add('status-pending');
            break;
        case 'in transit':
            statusElement.classList.add('status-in-transit');
            break;
        case 'delivered':
            statusElement.classList.add('status-delivered');
            break;
        default:
            // Default status style if necessary
            break;
    }
});
