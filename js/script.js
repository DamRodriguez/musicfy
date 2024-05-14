const audios = document.querySelectorAll(".audio");
const playButtons = document.querySelectorAll(".play");

playButtons.forEach((playButton, index) => {
    const audio = audios[index];
    const botonPlay = playButton.querySelector(".boton-play");
    const botonPause = playButton.querySelector(".boton-pausa");

    playButton.addEventListener("click", () => {
        if (audio.paused) {
            botonPause.classList.remove("hide");
            botonPlay.classList.add("hide");
            audio.play();
        } else {
            audio.pause();
            botonPause.classList.add("hide");
            botonPlay.classList.remove("hide");
        }
    });
});