module.exports = {
    redesValidator: (redes) => {
        try {
            if(redes.length == 0) throw new Error();
            redes.map(({url,telefono}) => {
                if(!url && !telefono) throw new Error();
            });
            return true;
        } catch (error) {
            return false;
        }
    }
};