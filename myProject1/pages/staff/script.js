document.getElementById('new-shipment-btn').addEventListener('click', function() {
    const shipmentList = document.querySelector('.shipment-list');
    const newShipment = document.createElement('div');
    const shipmentCount = document.querySelectorAll('.shipment').length + 1;

    newShipment.classList.add('shipment');
    newShipment.innerHTML = `
        <h3>Shipment #${shipmentCount}</h3>
        <p>Status: Pending</p>
        <button>Edit</button>
        <button>Detail status</button>
    `;

    shipmentList.appendChild(newShipment);
});
