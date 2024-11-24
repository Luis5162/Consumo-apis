document.getElementById('loadData').addEventListener('click', async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    
    const americanCountries = countries.filter(country => country.region === 'Americas');
    
    const labels = americanCountries.map(country => country.name.common);
    const populations = americanCountries.map(country => country.population);

    const ctx = document.getElementById('populationChart').getContext('2d');
    const populationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Población',
                data: populations,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
