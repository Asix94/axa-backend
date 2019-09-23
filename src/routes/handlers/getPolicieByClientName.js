const logic = require('../../logic');

module.exports = (req,res) => {
   
    const { params : { name } } = req
    
    logic.getPolicieByClientName(name)
        .then(policies => {
            res.json({
                ok: true,
                policies
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                err: err.message
            })
        })
}