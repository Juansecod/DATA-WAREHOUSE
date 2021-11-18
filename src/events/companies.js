const addCompanyDisplay = (btn,form) => btn.addEventListener('click', () => {
    document.getElementById('companies').style.display = 'none';
    form.style.display = 'flex';
});

const addCompanyHidden = (btn,form) => btn.addEventListener('click', () => {
    const container = document.getElementById('error-info');
    const text = document.getElementById('text-error');
    container.style.display = 'none';
    text.textContent = '';
    document.getElementById('companies').style.display = 'block';
    form.style.display = 'none';
});

export {addCompanyDisplay, addCompanyHidden};