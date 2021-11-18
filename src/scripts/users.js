import { dataTable, registerUser } from "../utils/users.js";
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

dataTable(table);
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