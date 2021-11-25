const dataError = {
    400: {
        data: 'Ups! Algo ha salido mal, por favor intentelo nuevamente. Revise los campos ingresados dado sea el caso.'
    },
    401: {
        data: 'No tienes acceso'
    },
    403: {
        data: 'Forbidden'
    },    
    404: {
        data: 'No Encontrado'
    },
    405: {
        data: 'Method Not Allowed'
    },
    406: {
        data: 'Not Acceptable'
    },
};

const errorResponse = (res, {message: code}) => {
    if(!dataError[code]) code = 400;
    return res.status(code).json({
        msg: false,
        data: dataError[code].data
    });
};



module.exports = errorResponse;