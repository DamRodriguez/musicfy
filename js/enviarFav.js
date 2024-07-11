
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.FavAñadir');
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modal-message");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const artista_id = document.querySelector('.IDartista').value;
        const imagen_url = document.querySelector('.IMGartista').value;
        const href = document.querySelector('.HREFartista').value;
        const mensaje_existente = "Éste artista ya está en tu lista de favoritos";
        const mensaje_exito = "Artista agregado a con éxito!";

        const favorito = { 
            artista_id, 
            imagen_url, 
            href,
            mensaje_existente,
            mensaje_exito
        };

        try {
            const response = await fetch('https://damrod99.pythonanywhere.com/añadir_favorito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favorito)
            });

            const data = await response.json();

            if (response.status === 409) {
                // Mostrar mensaje de favorito ya existe
                modalMessage.textContent = data.mensaje;
                modal.style.display = "block";
                setTimeout(() => {
                    modal.style.display = "none";
                }, 2000);
                return;
            }

            if (!response.ok) {
                throw new Error('Error al agregar favorito');
            }

            // Mostrar mensaje de éxito
            modalMessage.textContent = data.mensaje;
            modal.style.display = "block";
            setTimeout(() => {
                modal.style.display = "none";
            }, 2000);

        } catch (error) {
            console.error('Error al agregar favorito:', error);
            modalMessage.textContent = 'Hubo un error al intentar agregar el favorito';
            modal.style.display = "block";
            setTimeout(() => {
                modal.style.display = "none";
            }, 2000);
        }
    });

    // Cerrar el modal cuando el usuario hace clic fuera del modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});