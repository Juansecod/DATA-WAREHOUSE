module.exports = {
    emailValidator: (mail) => {
        try{
            const emailSplit1 = mail.split('@')[1];
            if(!(!emailSplit1)) { emailSplit2 = emailSplit1.split('.')[1]; }
            if(!emailSplit1 || !emailSplit2) throw new Error ('400 mal mail');
            return true;
        }catch(error){
            return false;
        }
    },
};