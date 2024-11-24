function cargarPoblacionPorIdioma(idioma, fila) {
    return fetch(`https://restcountries.com/v3.1/lang/${idioma}`)
      .then(response => response.json())
      .then(data => {
        let totalPoblacion = 0;
  
        data.forEach(pais => {
          totalPoblacion += pais.population;
        });
  
        fila.innerHTML = `
          <td>${idioma.charAt(0).toUpperCase() + idioma.slice(1)}</td>
          <td>${totalPoblacion.toLocaleString()}</td>
        `;
  
        return totalPoblacion; 
      })
      .catch(error => {
        console.error(`Error al cargar los países que hablan ${idioma}:`, error);
        fila.innerHTML = `
          <td>${idioma.charAt(0).toUpperCase() + idioma.slice(1)}</td>
          <td>Error al cargar los datos</td>
        `;
        return 0; 
      });
  }
  
 
  function crearGrafica(idiomas, poblaciones) {
    const ctx = document.getElementById('populationChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: idiomas,
        datasets: [{
          label: 'Población',
          data: poblaciones,
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
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    const tablaPoblacion = document.getElementById('tabla-poblacion');
    const idiomas = ['english', 'japanese', 'french','chinese','spanish'];
    const poblaciones = [];
  
    idiomas.forEach(idioma => {
      const fila = document.createElement('tr');
      tablaPoblacion.appendChild(fila);
      cargarPoblacionPorIdioma(idioma, fila).then(total => {
        poblaciones.push(total);
        if (poblaciones.length === idiomas.length) {
      
          crearGrafica(idiomas.map(i => i.charAt(0).toUpperCase() + i.slice(1)), poblaciones);
        }
      });
    });
  });
  