// ===== Read input values and address =====
let chartContainer = document.getElementById('chartContainer');
let inputValues = JSON.parse(chartContainer.dataset.values || '[0,0,0,0]');
let posted_location = chartContainer.dataset.location || '';


// ===== Chart =====
let ctx = document.getElementById('valueChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['BHK','Sqft','Bathrooms','Balcony'],
        datasets: [{
            label: 'Input Values',
            data: inputValues,
            backgroundColor: ['#2575fc','#ff6a00','#ff4d4d','#28a745']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});

// ===== Map =====
let defaultLat = 12.9716, defaultLon = 77.5946; // Bengaluru center
let map = L.map('map').setView([defaultLat, defaultLon], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let marker = L.marker([defaultLat, defaultLon]).addTo(map);

if (posted_location) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(posted_location + ", Bengaluru, India")}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                let lat = parseFloat(data[0].lat);
                let lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 13);
                marker.setLatLng([lat, lon]);
            }
        });
}

// ===== Clear Button =====
document.getElementById('clearBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('PriceForm').reset();

    // Reset chart
    chart.data.datasets[0].data = [0,0,0,0];
    chart.update();

    // Reset map to Bengaluru
    map.setView([defaultLat, defaultLon], 11);
    marker.setLatLng([defaultLat, defaultLon]);

    // Reset price
    document.getElementById('priceResult').innerText = " ✅ Estimated Price: ₹ -";
});

// --- Export PDF -----
document.getElementById('exportPdf').addEventListener('click', () => {
    let element = document.getElementById('fullPage'); // wrap only relevant part
    html2pdf().from(element).save();
});
