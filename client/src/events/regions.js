const formDisplay = (btn,form, id = '', typeAdd = '') => btn.addEventListener('click', () => {
    document.getElementById('regions').style.display = 'none';
    form.style.display = 'flex';
    if(id != '') document.getElementById(`register-${typeAdd}`).dataset.id = id; 
});

const formHidden = (btn,form, typeAdd) => btn.addEventListener('click', () => {
    const container = document.getElementById(`error-info-${typeAdd}`);
    const text = document.getElementById(`text-error-${typeAdd}`);
    container.style.display = 'none';
    text.textContent = '';
    document.getElementById('regions').style.display = 'block';
    form.style.display = 'none';
    if(typeAdd != 'region') delete document.getElementById(`register-${typeAdd}`).dataset.id;
});

export {formDisplay, formHidden};