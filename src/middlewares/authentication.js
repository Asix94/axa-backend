const jwt = require('jsonwebtoken');

const verificaToken = (req, res, next) => {

    const auth = req.get('authorization');
    const token = auth.split(' ')[1]

    const { env : { TOKEN_SECRET }} = process;

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.client = decoded.client;
        return next();

    });
}

const verificaAdminRole = (req, res, next) => {

    const { client } = req; 

    if (client.role === 'admin') {
        return next();
    }  
    
    return res.json({
        ok: false,
        err: {
            message: 'el usuario no es administrador'
        }
    });
    

}

module.exports = {
    verificaToken,
    verificaAdminRole
};