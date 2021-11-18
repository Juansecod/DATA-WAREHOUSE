const addContactDisplay = (btn,form) => btn.addEventListener('click', () => {
    document.getElementById('darker-background').style.display = 'block';
    form.style.display = 'block';
});

const addContactHidden = (btn,form) => btn.addEventListener('click', () => {
    document.getElementById('darker-background').style.display = 'none';
    form.style.display = 'none';
});

export {addContactDisplay, addContactHidden};