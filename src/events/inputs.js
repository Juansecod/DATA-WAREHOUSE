const functionsEventsInputs = {
    email: (input) => {
        const positionAt = input.value.search('@');
        const positionDot = input.value.search('.com');
        if(positionAt > 0 && positionDot > 1) {
            input.classList = 'success';
        }else{
            input.classList = 'required';
        }
    },
    password: (input) => {
        if(input.value.length >= 8) {
            input.classList = 'success';
        }else{ 
            input.classList = 'required';
        }
    },
    samePassword: (input, password) => {
        if(input.value == password.value && input.value.length >= 8){
            input.classList = 'success';
        }else{ 
            input.classList = 'required';
        }
    },
    default: (input) => {
        if(input.value != ''){
            input.classList = 'success';
        }else{ 
            input.classList = 'required';
        }
    }
};

const eventInputs = (input, type, password) => {
    if(!type) type = 'default';
    input.addEventListener("keyup",() => {
        functionsEventsInputs[type](input, password);
    });
    input.addEventListener("keypress", (e) => {
        if(e.keyCode == 13) e.preventDefault();
    });
};

const eventSelect = (select) => {
    select.addEventListener("change", () => {
        functionsEventsInputs['default'](select);
    });
};

export {eventInputs, eventSelect};