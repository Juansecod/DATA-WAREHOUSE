import { errorForm } from '../utils/global.js';
import login from '../utils/login.js';

const eventGenLogin = (button) => button.addEventListener("click", ()=>{
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;   
    const data = {
        email,
        contrasena
    };
    login(data)
        .then((res) => {
            if(!res.msg) throw new Error(res.data);
            if(res.admin) localStorage.setItem('admin', res.admin);
            localStorage.setItem('token', res.token);
            window.location.replace('./contactos.html');
        })
        .catch(({message}) => {
            errorForm(message);
        });
});

export {eventGenLogin};

