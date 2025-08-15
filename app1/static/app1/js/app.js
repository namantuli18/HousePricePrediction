
// ===== Read input values and address =====
const chartContainer = document.getElementById('chartContainer');
const inputValues = JSON.parse(chartContainer.dataset.values || '[0,0,0,0,0]');
const posted_address = chartContainer.dataset.address || '';

// ===== Chart =====
const ctx = document.getElementById('valueChart').getContext('2d');
const chart = new Chart(ctx, {
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
const marker = L.marker([20,0]).addTo(map);

if(posted_address){
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(posted_address)}`)
    .then(res => res.json())
    .then(data => {
        if(data.length>0){
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            map.setView([lat, lon], 15);
            marker.setLatLng([lat, lon]);
        }
    });
}

// ===== Clear Button =====
document.getElementById('clearBtn').addEventListener('click', () => {
    chart.data.datasets[0].data = [0,0,0,0,0];
    chart.update();
    map.setView([20,0],2);
    marker.setLatLng([20,0]);
    document.getElementById('priceResult').innerText = "💰 Estimated Price: -";
});

// ===== Static Map URL for PDF =====
function getStaticMapURL(lat, lon, zoom=15, width=600, height=300){
    return `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=${width},${height}&z=${zoom}&l=map&pt=${lon},${lat},pm2rdm`;
}

// ===== Export Full Page PDF =====
document.getElementById('exportPdf').addEventListener('click', async () => {
    const mapContainer = document.getElementById('map');
    const mapImage = document.getElementById('mapImage');

    const markerLatLng = marker.getLatLng();
    mapImage.src = getStaticMapURL(markerLatLng.lat, markerLatLng.lng);

    mapImage.onload = function(){
        mapContainer.style.display = 'none';
        mapImage.style.display = 'block';

        html2pdf().set({
            margin: 10,
            filename: 'House_Prediction_FullPage.pdf',
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { orientation: 'portrait', unit: 'pt', format: 'a4' }
        }).from(document.getElementById('fullPage')).save().finally(() => {
            mapContainer.style.display = 'block';
            mapImage.style.display = 'none';
        });
    };
});
