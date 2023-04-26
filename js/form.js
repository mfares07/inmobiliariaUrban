//utilizo const ya que no serán reasignadas estas variables
//selectores
const formulario = document.querySelector('.formulario');
const inputs = document.querySelectorAll('.formulario input');
const selector = document.querySelector('#choise');
const mensaje = document.querySelector('#message');

//expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Sin caracteres especiales.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
//objeto que servirá para validar cada campo
const revisar = {
    name: 0,
    lastname: 0,
    email: 0,
    phone: 0,
    select: 0,
    message: 0
}
//si todos los campos estan correctos esta funcion devuelve true, de lo contrario devuelve false
function validaTodo() {
    if (revisar.name && revisar.lastname && revisar.email && revisar.phone
        // prettier-ignore
        && revisar.select && revisar.message && (selector.value != 'elegir')
        // prettier-ignore
        && (mensaje.value != "")) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}
//si se valido todo elimino los warnings que quedaron en el formulario
function chequearWarning() {
    if (validaTodo()) document.querySelector('.formulario .warning').classList.remove('warning-js');
    else document.querySelector('.formulario .warning').classList.add('warning-js');
}

//Esta función agrega mensaje de exito si la validación fue correcta, y a los 4 segundos se desaparece el mensaje. 
//De lo contrario, agrega un mensaje de error en los inputs.
function envio(e) {    
    chequearWarning();
    if (validaTodo()) {
        reset();
        document.querySelector('.formulario .exito').classList.add('exito-js');
        setInterval(() => {
            document.querySelector('.formulario .exito').classList.remove('exito-js');
        }, 4000);
    }
    else {        
        if (selector.value == 'elegir') {
            document.querySelector('.asunto .form_input_error').classList.add('form_input_error-js');
        }
        inputs.forEach((input) => { //agregar mensaje de error a los inputs vacíos
            if (input.value == '') {
                document.querySelector(`.${input.parentElement.classList[1]} .form_input_error`).classList.add('form_input_error-js');
            }
        })
    }
}
//valido las expresiones y envío al objeto revisar un 1 a la propiedad correspondiente.
let validar = (expr, input, val, clase) => {
    if (expr.test(val)) {
        document.querySelector(`.formulario ${clase}`).classList.remove('form_section-no');
        document.querySelector(`.formulario ${clase}`).classList.add('form_section-yes');
        document.querySelector(`${clase} .form_input_error`).classList.remove('form_input_error-js');
        document.querySelector(`${clase} .fa-solid`).classList.remove('fa-circle-xmark');
        document.querySelector(`${clase} .fa-solid`).classList.add('fa-circle-check');
        revisar[input] = 1;
    } else {
        document.querySelector(`.formulario ${clase}`).classList.add('form_section-no');
        document.querySelector(`${clase} .fa-solid`).classList.add('fa-circle-xmark');
        document.querySelector(`${clase} .fa-solid`).classList.remove('fa-circle-check');
        document.querySelector(`${clase}  .form_input_error`).classList.add('form_input_error-js');
        revisar[input] = 0;
    }
}
//cuando se activó un input llamo a la función validar y le paso cuatro argumentos: 
//el campo que debe compararse con las expresiones, el input, el value y la clase
let checkearInputs = (e) => {
    let input = e.target.name;
    let value = e.target.value;

    if (input == 'name') validar(expresiones.nombre, input, value, '.nombre');
    else if (input == 'lastname') validar(expresiones.nombre, input, value, '.apellido');
    else if (input == 'email') validar(expresiones.correo, input, value, '.email');
    else if (input == 'phone') validar(expresiones.telefono, input, value, '.telefono');
}
//Si en el select no se eligió nada, envío un 1 al objeto revisar en la propiedad correspondiente, de lo contrario un 0
selector.addEventListener('change', () => {
    if (selector.value !== 'elegir') {
        revisar['select'] = 1;
        document.querySelector('.asunto .form_input_error').classList.remove('form_input_error-js');
    }
    else {
        revisar['select'] = 0;
        document.querySelector('.asunto .form_input_error').classList.add('form_input_error-js');
    }
    chequearWarning();
})
//Compruebo si el textarea se completó y envío un 1 al objeto revisar en la propiedad correspondiente, de lo contrario un 0
let verificaMensaje = (e) => {
    if (e.target.value != "") {
        revisar['message'] = 1;
    }
    else {
        revisar['message'] = 0;
    }
    chequearWarning();
}
//Esta función limpia el formulario y remueve los warnings e iconos.
let reset = () => {
    formulario.reset();
    document.querySelector('.formulario .warning').classList.remove('warning-js');
    document.querySelector('.asunto .form_input_error').classList.remove('form_input_error-js');
    inputs.forEach((input) => {
        //remover mensajes de error de los inputs e iconos.
        document.querySelector(`.${input.parentElement.classList[1]} .form_input_error`).classList.remove('form_input_error-js');
        document.querySelector(`.${input.parentElement.classList[1]} .validIcons`).classList.remove('fa-circle-check');
        document.querySelector(`.${input.parentElement.classList[1]} .validIcons`).classList.remove('fa-circle-xmark');
        document.querySelector(`.${input.parentElement.classList[1]}`).classList.remove('form_section-no');
    })
}
//segun el evento que se dispara, llamo a la función correspondiente
for (let i = 0; i < 2; i++) {
    mensaje.addEventListener('blur', verificaMensaje);
    mensaje.addEventListener('keyup', verificaMensaje);
}
inputs.forEach((input) => {
    input.addEventListener('blur', checkearInputs);
    input.addEventListener('keyup', checkearInputs);
})
formulario.addEventListener('reset', reset);
formulario.addEventListener('submit', envio);
