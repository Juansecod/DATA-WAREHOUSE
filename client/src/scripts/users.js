import { dataTable, updateUser } from "../utils/users.js";
import { addUserDisplay, addUserHidden, eventRegisterBtn } from "../events/users.js";
import { eventInputs } from "../events/inputs.js";
import { errorForm } from "../utils/global.js";

const table = document.getElementById('table-users');
const addUserSection = document.getElementById('add-user');
const addUserButton = document.getElementById('add-user-button');
const cancelAddUser = document.getElementById('cancel-add-user');
const email = document.getElementById('email');
const password = document.getElementById('password');
const samePassword = document.getElementById('same-password');
const registerUserButton = document.getElementById('register-user');
const updateUserButton = document.getElementById('update-user');

dataTable(table);

addUserButton.addEventListener('click', ()=> {
    document.getElementById('register-user').style.display = '';
    document.getElementById('note').style.display = '';
    document.getElementById('container-rols').style.display = '';
    document.getElementById('update-user').style.display = 'none';
    document.getElementById('title').textContent = 'Nuevo Usuario';
    document.getElementById('name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('email').classList = 'required';
});
addUserDisplay(addUserButton, addUserSection);
addUserHidden(cancelAddUser, addUserSection);
eventInputs(email,'email');
eventInputs(password,'password');
eventInputs(samePassword, 'samePassword', password);

registerUserButton.addEventListener('click', ()=> { 
    const positionAt = email.value.search('@');
    const positionDot = email.value.search('.com');
    if(positionAt > 0 && positionDot > 1 && password.value.length >= 8 && samePassword.value == password.value && samePassword.value.length >= 8) {
        eventRegisterBtn(email,password, cancelAddUser);
    }else{
        errorForm('Revisa que esten completos los campos requeridos');
    } 
}); 

updateUserButton.addEventListener('click', ()=> {
    const data = {
        nombre: document.getElementById('name').value,
        apellido: document.getElementById('last-name').value,
        email: email.value,
    };
    const positionAt = email.value.search('@');
    const positionDot = email.value.search('.com');
    try {
        if(positionAt > 0 && positionDot > 1) {
            if(password.value != undefined && password.value != samePassword.value) throw new Error();
            if(password.value != undefined && password.value.length >= 8 && samePassword.value == password.value) data.contrasena = password.value;
            updateUser(data,updateUserButton.getAttribute('id-user'),cancelAddUser);
        }else{
            throw new Error();
        } 
    } catch (error) {
        errorForm('Revisa que esten bien escritos todos los campos');
    }
});