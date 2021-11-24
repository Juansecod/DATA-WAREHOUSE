import { formNetwork } from "../models/contacts.js";

const addContactDisplay = (btn,form) => btn.addEventListener('click', () => {
    document.getElementById('darker-background').style.display = 'block';
    form.style.display = 'block';
});

const addContactHidden = (btn,form, containerFormNetwork, btnAddNetwork) => btn.addEventListener('click', () => {
    containerFormNetwork.innerHTML = '';
    const newForm = document.createElement('div');
    newForm.classList = 'form-network';
    newForm.innerHTML = formNetwork(0);
    containerFormNetwork.appendChild(newForm);
    containerFormNetwork.appendChild(btnAddNetwork);

    document.getElementById('darker-background').style.display = 'none';
    form.style.display = 'none';
});

export {addContactDisplay, addContactHidden};