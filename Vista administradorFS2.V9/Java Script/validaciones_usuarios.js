// Selección de formulario e inputs
const formulario = document.querySelector(".formulario");
const inputs = document.querySelectorAll(".formulario input");

// Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-Z0-9\s\-\_]{4,40}$/,
    usuario: /^[a-zA-Z0-9\_]{4,16}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,20}$/,
    telefono: /^\d{7,15}$/
};

// Estado de campos
const campos = {
    nombre: false,
    usuario: false,
    correo: false,
    password: false,
    confirmar: false,
    telefono: true
};

// Función para marcar borde
const marcarBorde = (input, valido) => {
    if(valido){
        input.style.border = "2px solid green";
    } else {
        input.style.border = "2px solid red";
    }
};

// Validar un campo
const validarCampo = (expresion, input, campo) => {
    const error = document.getElementById(`error-${campo}`);
    if(expresion.test(input.value)){
        if(campo === "telefono" && input.value.length > 0 && !expresion.test(input.value)){
            error.textContent = "Ingrese un teléfono válido (solo números, 7-15 dígitos)";
            campos[campo] = false;
            marcarBorde(input, false);
        } else {
            error && (error.textContent = "");
            campos[campo] = true;
            marcarBorde(input, true);
        }
    } else {
        switch(campo){
            case "nombre":
                error && (error.textContent = "El nombre debe tener entre 4 y 40 caracteres.");
                break;
            case "usuario":
                error && (error.textContent = "El usuario debe tener 4-16 caracteres y solo letras, números o guion bajo.");
                break;
            case "correo":
                error && (error.textContent = "Correo electrónico inválido.");
                break;
            case "password":
                error && (error.textContent = "La contraseña debe tener entre 6 y 20 caracteres.");
                break;
        }
        campos[campo] = false;
        marcarBorde(input, false);
    }
};

// Validar confirmación de contraseña
const validarConfirmar = () => {
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmar");
    const error = document.getElementById("error-confirmar");

    if(password.value === confirmar.value && confirmar.value !== ""){
        error && (error.textContent = "");
        campos.confirmar = true;
        marcarBorde(confirmar, true);
    } else {
        error && (error.textContent = "Las contraseñas no coinciden.");
        campos.confirmar = false;
        marcarBorde(confirmar, false);
    }
};

// Eventos de inputs
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        switch(e.target.id){
            case "nombre":
                validarCampo(expresiones.nombre, e.target, "nombre");
                break;
            case "usuario":
                validarCampo(expresiones.usuario, e.target, "usuario");
                break;
            case "correo":
                validarCampo(expresiones.correo, e.target, "correo");
                break;
            case "password":
                validarCampo(expresiones.password, e.target, "password");
                validarConfirmar();
                break;
            case "confirmar":
                validarConfirmar();
                break;
            case "telefono":
                if(e.target.value.length > 0){
                    validarCampo(expresiones.telefono, e.target, "telefono");
                } else {
                    campos.telefono = true;
                    e.target.style.border = ""; // borde normal si vacío
                }
                break;
        }
    });

    input.addEventListener('blur', (e) => {
        // misma lógica al salir del input
        switch(e.target.id){
            case "nombre":
                validarCampo(expresiones.nombre, e.target, "nombre");
                break;
            case "usuario":
                validarCampo(expresiones.usuario, e.target, "usuario");
                break;
            case "correo":
                validarCampo(expresiones.correo, e.target, "correo");
                break;
            case "password":
                validarCampo(expresiones.password, e.target, "password");
                validarConfirmar();
                break;
            case "confirmar":
                validarConfirmar();
                break;
            case "telefono":
                if(e.target.value.length > 0){
                    validarCampo(expresiones.telefono, e.target, "telefono");
                } else {
                    campos.telefono = true;
                    e.target.style.border = "";
                }
                break;
        }
    });
});

// Validación al enviar el formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(campos.nombre && campos.usuario && campos.correo && campos.password && campos.confirmar && campos.telefono){
        alert("✅ Usuario registrado correctamente");
        formulario.reset();
        // Reset bordes
        inputs.forEach(input => input.style.border = "");
        Object.keys(campos).forEach(campo => campos[campo] = campo === "telefono" ? true : false);
    } else {
        alert("⚠️ Por favor complete correctamente todos los campos.");
    }
});
