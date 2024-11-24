document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('search').value;
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const countryData = data[0];
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <h2>${countryData.name.common}</h2>
                <img src="${countryData.flags.svg}" alt="Bandera de ${countryData.name.common}" width="150">
                <p><strong>Capital:</strong> ${countryData.capital[0]}</p>
                <p><strong>Población:</strong> ${countryData.population.toLocaleString()}</p>
                <p><strong>Idioma:</strong> ${Object.values(countryData.languages).join(', ')}</p>
                <p><strong>Región:</strong> ${countryData.region}</p>
            `;
        })
      
});
