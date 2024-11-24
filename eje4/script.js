const apiUrl = 'https://gaia.inegi.org.mx/wscatgeo/mgee/';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.datos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

document.getElementById('buscarBtn').addEventListener('click', async () => {
    const estadoInput = document.getElementById('estadoInput').value.toLowerCase();
    const resultadoDiv = document.getElementById('resultado');

    const estados = await fetchData();

    if (estados) {
        const estado = estados.find(item => item.nom_agee.toLowerCase() === estadoInput || item.nom_abrev.toLowerCase() === estadoInput);
        
        if (estado) {
            resultadoDiv.innerHTML = `
                <h3>${estado.nom_agee}</h3>
                <p>Población total: ${estado.pob}</p>
                <p>Población femenina: ${estado.pob_fem}</p>
                <p>Población masculina: ${estado.pob_mas}</p>
                
            `;
        } else {
            resultadoDiv.innerHTML = `<p>Estado no encontrado. Por favor, verifica la escritura.</p>`;
        }
    }
});
