const jwt = require('jsonwebtoken');
const logic = require('../../logic');

module.exports = (req,res) => {

    const { env : { TOKEN_SECRET, TOKEN_EXP}} = process
    const { body : { email, password }} = req

    logic.authenticate(email,password)
    .then(client => {

        const token = jwt.sign({
            client
        }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

        res.json({
            ok: true,
            token
        })
    }).catch(err => {
        res.json({
            ok: false,
            err: err.message
        })
    })
}