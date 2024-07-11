/*reproduccion de canciones*/

const audios = document.querySelectorAll(".audio");
const playButtons = document.querySelectorAll(".play");

let currentAudio = null;

playButtons.forEach((playButton, index) => {
    const audio = audios[index];
    const botonPlay = playButton.querySelector(".boton-play");
    const botonPause = playButton.querySelector(".boton-pausa");

    playButton.addEventListener("click", () => {

        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            const currentButton = playButtons[Array.from(audios).indexOf(currentAudio)];
            const currentPlayButton = currentButton.querySelector(".boton-play");
            const currentPauseButton = currentButton.querySelector(".boton-pausa");
            currentPauseButton.classList.add("hide");
            currentPlayButton.classList.remove("hide");
        }

        if (audio.paused) {
            botonPause.classList.remove("hide");
            botonPlay.classList.add("hide");
            audio.play();
            currentAudio = audio; 
        } else {
            audio.pause();
            botonPause.classList.add("hide");
            botonPlay.classList.remove("hide");
            currentAudio = null; 
        }
    });
});

/*icono resaltado del nav-derecha cuando se está en ese href*/

document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll(".nav-derecha ul li a");

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href, window.location.origin).href; // Normalizar URL

        // Comprobar si la URL actual está dentro de la URL del enlace
        if (currentUrl.includes(linkUrl)) {
            // Aplicar clase al padre del enlace (<li>)
            link.closest('a').classList.add("resaltarIcono");
        }
    });
});


/*..*/

