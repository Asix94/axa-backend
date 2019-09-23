const logic = require('../../logic');

module.exports = (req,res) => {
   
    const { params : { id } } = req
    
    logic.getClientByPolicieId(id)
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