document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('artistaForm');
    const tableBody = document.getElementById('artistasTable').querySelector('tbody');
    let isUpdating = false;

    //async permite que la función se comporte de manera asíncrona, 
    //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
    const fetchArtistas = async () => {
        // Luego cambiaremos la URL por https://<hostdepanywhere>/artistas
        const response = await fetch('https://damrod99.pythonanywhere.com/artistas'); // Promesa: esperar a que se complete la solicitud HTTP
        const artistas = await response.json(); // Esperar a que se complete la conversión de la respuesta a JSON
        tableBody.innerHTML = '';
        artistas.forEach(artista => {
            const row = document.createElement('tr');
            
            // Convertir la fecha a formato año-mes-día
            const fechaFormacion = new Date(artista.fecha_formacion);
            const year = fechaFormacion.getUTCFullYear();
            const month = String(fechaFormacion.getUTCMonth() + 1).padStart(2, '0');
            const day = String(fechaFormacion.getUTCDate()).padStart(2, '0');
            const fechaFormateada = `${year}-${month}-${day}`;
    
            row.innerHTML = `
                <td>${artista.id}</td>
                <td>${artista.nombre}</td>
                <td>${artista.genero}</td>
                <td>${artista.pais}</td>
                <td>${fechaFormateada}</td>
                <td>
                    <button class="boton-edit" onclick="editArtista(${artista.id}, '${artista.nombre}', '${artista.genero}', '${artista.pais}', '${fechaFormateada}')">Editar</button>
                    <button onclick="deleteArtista(${artista.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addArtista = async (artista) => {
        await fetch('https://damrod99.pythonanywhere.com/nuevo_artista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artista)
        });
        fetchArtistas();
    };

    const updateArtista = async (id, artista) => {
        await fetch(`https://damrod99.pythonanywhere.com/actualizar_artista/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artista)
        });
        fetchArtistas();
    };

    const deleteArtista = async (id) => {
        await fetch(`https://damrod99.pythonanywhere.com/eliminar_artista/${id}`, {
            method: 'DELETE'
        });
        fetchArtistas();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('artistaId').value;
        const nombre = document.getElementById('nombre').value;
        const genero = document.getElementById('genero').value;
        const pais = document.getElementById('pais').value;
        const fecha_formacion = document.getElementById('formacion').value;
        const artista = {nombre, genero, pais, fecha_formacion};

        if (isUpdating) {
            updateArtista(id, artista);
            isUpdating = false;
        } else {
            addArtista(artista);
        }

        form.reset();
        document.getElementById('artistaId').value = '';
    });

    window.editArtista = (id, nombre, genero, pais, fecha_formacion) => {
        document.getElementById('artistaId').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('genero').value = genero;
        document.getElementById('pais').value = pais;
        document.getElementById('formacion').value = fecha_formacion;
        isUpdating = true;
    };

    window.deleteArtista = (id) => {
        if (confirm('¿Estás seguro de eliminar este artista?')) {
            deleteArtista(id);
        }
    };

    fetchArtistas();
});


document.getElementById('formacion').addEventListener('change', function() {
    let input = this.value;
    let date = new Date(input);
    let formattedDate = date.toISOString().split('T')[0];
    this.value = formattedDate;
});


