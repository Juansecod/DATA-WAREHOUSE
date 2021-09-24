module.exports = {
    redesValidator: (redes) => {
        try {
            if(redes.length == 0) throw new Error();
            redes.map(({ url, telefono, canal }) => {
                if(!url && !telefono) throw new Error();
                if(!canal) throw new Error();
            });
            return true;
        } catch (error) {
            return false;
        }
    }
};