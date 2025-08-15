
// ===== Read input values and address =====
let chartContainer = document.getElementById('chartContainer');
let inputValues = JSON.parse(chartContainer.dataset.values || '[0,0,0,0,0]');
let posted_address = chartContainer.dataset.address || '';

// ===== Chart =====
let ctx = document.getElementById('valueChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['House Age','Rooms','Bedrooms','Income','Population'],
        datasets: [{
            label: 'Input Values',
            data: inputValues,
            backgroundColor: ['#6a11cb','#2575fc','#ff6a00','#ff4d4d','#28a745']
        }]
    },
    options: {responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}
});

// ===== Map =====
let map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);
let marker = L.marker([20,0]).addTo(map);

if(posted_address){
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(posted_address)}`)
    .then(res => res.json())
    .then(data => {
        if(data.length>0){
            let lat = parseFloat(data[0].lat);
            let lon = parseFloat(data[0].lon);
            map.setView([lat, lon], 15);
            marker.setLatLng([lat, lon]);
        }
    });
}

// ===== Clear Button =====
document.getElementById('clearBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('PriceForm').reset();
    chart.data.datasets[0].data = [0,0,0,0,0];
    chart.update();
    map.setView([20,0],2);
    marker.setLatLng([20,0]);
    document.getElementById('priceResult').innerText = "💰 Estimated Price: -";
});

// ---export pdf -----

document.getElementById('exportPdf').addEventListener('click', () => {
    html2pdf().from(document.body).save();
});