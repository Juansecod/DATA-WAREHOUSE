import { registerUser, deleteUser } from "../utils/users.js";

const addUserDisplay = (btn,form) => btn.addEventListener('click', () => {
    document.getElementById('users').style.display = 'none';
    form.style.display = 'flex';
});

const addUserHidden = (btn,form) => btn.addEventListener('click', () => {
    const container = document.getElementById('error-info');
    const text = document.getElementById('text-error');
    container.style.display = 'none';
    text.textContent = '';
    document.getElementById('users').style.display = 'block';
    form.style.display = 'none';
});

const eventDeleteBtn = (usuario, id)=> {
    const confirm = window.confirm(`Esta seguro que quire eliminar el usuario con correo ${usuario.email}`);
    if(confirm) deleteUser([id]);
};

const eventRegisterBtn = (email, password, closeForm)=> {
    const idRol = parseInt((document.getElementById('rolChoise1').checked) ? document.getElementById('rolChoise1').value : document.getElementById('rolChoise2').value);
    const data = {
        nombre: document.getElementById('name').value,
        apellido: document.getElementById('last-name').value,
        email: email.value,
        contrasena: password.value,
        idRol
    };
    console.table(data);
    registerUser(data, closeForm);
};

export {addUserDisplay, addUserHidden, eventDeleteBtn, eventRegisterBtn};