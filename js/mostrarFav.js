document.addEventListener('DOMContentLoaded', () => {

    const div = document.querySelector(".artistasFav");

    const fetchFavoritos = async () => {
        try {
            const response = await fetch('https://damrod99.pythonanywhere.com/favoritos');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de favoritos');
            }
            const favoritos = await response.json();

            // Limpiamos el contenido existente antes de agregar los nuevos favoritos
            div.innerHTML = '';

            favoritos.forEach(favorito => {
                const fav = document.createElement('div');
                fav.classList.add('item-index', 'eliminarHover');

                fav.innerHTML = `
                    <input type="hidden" value="${favorito.id}">
                    <a href="${favorito.href}">
                        <img src="${favorito.imagen_url}" alt="Artista">
                        <p class="titulo-foto-index">${favorito.nombre}</p>
                        <span>
                            <i class="fa-solid fa-play boton-hover"></i>
                        </span>
                    </a>
                    <button class="eliminarFav" onclick="deleteFavorito(${favorito.id})">Eliminar</button>
                `;
                div.appendChild(fav);
            });
            
        } catch (error) {
            console.error('Error al obtener la lista de favoritos:', error);
        }
    };

    // Función para eliminar un favorito
    const deleteFavorito = async (id) => {
        try {
            const response = await fetch(`https://damrod99.pythonanywhere.com/eliminar_favorito/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('No se pudo eliminar el favorito');
            }
            fetchFavoritos(); // Actualizamos la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el favorito:', error);
        }
    };

    // Agregamos la función deleteFavorito al ámbito global para poder llamarla desde el HTML
    window.deleteFavorito = deleteFavorito;
    
    fetchFavoritos();
});