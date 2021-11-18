function generateDOM(object, father, model, typeContainer = 'div', classList = '' ){
	const childrenParent = document.createElement(typeContainer);
	childrenParent.classList = classList;
	childrenParent.innerHTML = model(object);
	father.appendChild(childrenParent);

    return childrenParent;
}

function errorAdmin (errorInfo, container) {
    if(errorInfo.message.toLowerCase() == "no tienes acceso") window.location.replace('./contactos.html');
    container.style.display = 'none'; 
}

function errorForm (message = 'Ups, algo ha salido mal'){
    const container = document.getElementById('error-info');
    const text = document.getElementById('text-error');
    container.style.display = 'flex';
    text.textContent = message;
    setTimeout(function(){ 
        container.style.display = 'none';
    },5000);
}

export {generateDOM,errorAdmin, errorForm};