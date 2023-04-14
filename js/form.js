const formulario = document.querySelector('.formulario');
const inputs = document.querySelectorAll('.formulario input');
const selector = document.querySelector('#choise');
const mensaje = document.querySelector('#message');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Sin caracteres especiales.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
const revisar = {
    name: 0,
    lastname: 0,
    email: 0,
    phone: 0,
    select: 0,
    message: 0
}

function validaTodo() {
    if (revisar.name && revisar.lastname && revisar.email && revisar.phone
        // prettier-ignore
        && revisar.select && revisar.message && (selector.value != 'elegir')
        // prettier-ignore
        && (mensaje.value != "")) {
        return true;
    }
    else {
        return false;
    }
}

function chequearWarning() {
    if (validaTodo()) document.querySelector('.formulario .warning').classList.remove('warning-js');
    else document.querySelector('.formulario .warning').classList.add('warning-js');
}

function envio(e) {
    e.preventDefault();
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

const validar = (expr, input, val, clase) => {
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

const checkearInputs = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    if (input == 'name') validar(expresiones.nombre, input, value, '.nombre');
    else if (input == 'lastname') validar(expresiones.nombre, input, value, '.apellido');
    else if (input == 'email') validar(expresiones.correo, input, value, '.email');
    else if (input == 'phone') validar(expresiones.telefono, input, value, '.telefono');
}

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

const verificaMensaje = (e) => {
    if (e.target.value != "") {
        revisar['message'] = 1;
    }
    else {
        revisar['message'] = 0;
    }
    chequearWarning();
}

const reset = () => {
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
