document.getElementById('tracking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const trackingNumber = document.getElementById('tracking-number').value;

    if (trackingNumber === '') {
        alert('Please enter a tracking number.');
        return;
    }

    // Here you would typically send the data to your server for tracking
    // For now, we will just simulate a successful tracking submission
    alert('Tracking number submitted successfully!');
    window.location.href = 'shipment-status.html'; // Redirect to a page showing shipment status
});
