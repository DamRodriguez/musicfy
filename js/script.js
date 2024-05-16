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

/*----------------------validacion registro------------------------------*/

function validar(Document){
    if(Document ==="Login"){
        validacionLogin();
    }
    else if(Document === "Register"){
        validacionregister();
    }
    else{
        alert("Documento no válido")
    }

    function validarNombre(){
        let inputNombre = document.querySelector("#nombreUsuarioIngresado")
        if (inputNombre.value.length < 4 || inputNombre.value.length > 12) {
            let divError = document.querySelector("#errorNombre")
            divError.textContent = "El campo Nombre debe tener como minimo 5 caracteres y como maximo 12 caracteres"
            divError.classList.remove("error")
            divError.classList.add("active")
            /*inputNombre.classList.add("error") 
        */
            return false;
        }
        else{
            let divError = document.querySelector("#errorNombre")
            divError.textContent = " "
            divError.classList.remove("active")
            divError.classList.add("error")
            return true;

        }
    }
    
    function validarApellido(){
        let inputApellido = document.querySelector("#apellidoDeUsuarioIngresado")
        if (inputApellido.value.length < 4 || inputApellido.value.length > 12) {
            let divError = document.querySelector("#errorApellido")
            divError.textContent = "El campo Apellido debe tener como minimo 5 caracteres y como maximo 12 caracteres"
            divError.classList.remove("error")
            divError.classList.add("active")
            /*inputApellido.classList.add("error") 
        */
            return false;
        }
        else{
            let divError = document.querySelector("#errorApellido")
            divError.textContent = " "
            divError.classList.remove("active")
            divError.classList.add("error")
            return true;
        }
    }

    function validarMail(){
        var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        let inputMail = document.querySelector("#emailIngresado")
        if (validEmail.test(inputMail.value)){
            let divError = document.querySelector("#errorMail")
            divError.textContent = " "
            divError.classList.remove("active")
            divError.classList.add("error")
            return true;
        }else{
            let divError = document.querySelector("#errorMail")
            divError.textContent = "El mail no es válido, ingréselo nuevamente"
            divError.classList.remove("error")
            divError.classList.add("active")
            return false;
        }
    }

    function validarPassword(){
        let inputPassword = document.querySelector("#passwordUsuarioIngresado")
        if(Document === "Login"){
            if (inputPassword.value.length < 4 || inputPassword.value.length > 12) {
                let divError = document.querySelector("#errorPassword")
                divError.textContent = "Contraseña inválida"
                divError.classList.remove("error")
                divError.classList.add("active")
                return false;
            }
            else{
                let divError = document.querySelector("#errorPassword")
                divError.textContent = "  "
                divError.classList.remove("active")
                divError.classList.add("error")
                return true;
            }
        }

        else{
            if (inputPassword.value.length < 4 || inputPassword.value.length > 12) {
                let divError = document.querySelector("#errorPassword")
                divError.textContent = "La contraseña debe tener como minimo 5 caracteres y como maximo 12 caracteres"
                divError.classList.remove("error")
                divError.classList.add("active")
            return false;
            }
            else{
                let divError = document.querySelector("#errorPassword")
                divError.textContent = "  "
                divError.classList.remove("active")
                divError.classList.add("error")
                return true;
            }
        }
    }

    function validarFecha(){
        let inputFecha = document.querySelector("#fechaDeNacimientoIngresado")
        if (inputFecha.value.length < 4 || inputFecha.value.length > 12) {
            let divError = document.querySelector("#errorFecha")
            divError.textContent = "Debe ingresar una fecha válida"
            divError.classList.remove("error")
            divError.classList.add("active")
        
            return false;
        }
        else{
            let divError = document.querySelector("#errorFecha")
            divError.textContent = " "
            divError.classList.remove("active")
            divError.classList.add("error")
            return true;
        }
    }
    function validarPais(){
        let inputPais = document.querySelector("#paisIngresado")
        if (inputPais.value === "0"){
            let divError = document.querySelector("#errorPais")
            divError.textContent = "Debe seleccionar una opción"
            divError.classList.remove("error")
            divError.classList.add("active")
            
            return false;
        }
        else{
            let divError = document.querySelector("#errorPais")
            divError.textContent = " "
            divError.classList.remove("active")
            divError.classList.add("error")
            return true;
        }
    }
    function validarTerminos(){
        let inputTerminos = document.querySelector("#terminos-checkbox")
        if (!inputTerminos.checked){
            let divError = document.querySelector("#errorTyC")
            divError.textContent = "Debe aceptar terminos y condiciones para continuar"
            divError.classList.remove("error")
            divError.classList.add("active")
            return false;
        }
        else{
            let divError = document.querySelector("#errorTyC")
            divError.textContent = "  "
            divError.classList.remove("active")
            divError.classList.add("error")
            return true;
        }
    }
    function validacionLogin(){
        let formLogin = document.querySelector("#formLogin"); 

        let validarDatosLogin = (event) => {
            event.preventDefault();
            let validacionM = true;
            let validacionC = true;
            validacionM = validarMail();
            validacionC = validarPassword();
            
            if (validacionC && validacionM){
                formLogin.submit();
            }
        }
        formLogin.addEventListener('submit', validarDatosLogin)
    }
    function validacionregister(){
        let formRegistro = document.querySelector("#formRegistro"); 

        let validarDatos = (event) => {

            event.preventDefault();

            let validacionN = true;
            let validacionA = true;
            let validacionM = true;
            let validacionC = true;
            let validacionF = true;
            let validacionP = true;
            let validacionT = true;
            validacionN = validarNombre();
            validacionA = validarApellido();
            validacionM = validarMail();
            validacionC = validarPassword();
            validacionF = validarFecha();
            validacionP = validarPais();
            validacionT = validarTerminos();

            if (validacionN && validacionA && validacionM && validacionC && validacionF && validacionP && validacionT) {
                formRegistro.submit(); 
            }

        }
        formRegistro.addEventListener('submit', validarDatos)
    }
}