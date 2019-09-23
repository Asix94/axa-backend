const logic = require('../../logic');

module.exports = (req,res) => {
   
    const { params : { name } } = req
    
    logic.getClientByName(name)
        .then(clients => {
            res.json({
                ok: true,
                clients
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                err: err.message
            })
        })
}