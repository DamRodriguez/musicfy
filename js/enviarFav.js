document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.FavAñadir');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const artista_id = document.querySelector('.IDartista').value;
        const imagen_url = document.querySelector('.IMGartista').value;
        const href = document.querySelector('.HREFartista').value;

        const favorito = { artista_id, imagen_url, href };

        try {
            const response = await fetch('https://damrod99.pythonanywhere.com/añadir_favorito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favorito)
            });

            if (!response.ok) {
                throw new Error('Error al agregar favorito');
            }

        } catch (error) {
            console.error('Error al agregar favorito:', error);
        }
    });
});