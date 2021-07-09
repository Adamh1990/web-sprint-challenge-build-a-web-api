// add middlewares here related to actions
function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)
    next()
}
const Actions = require('./actions-model')

function validateActionsId(req, res, next){
    Actions.get(req.params.id)
        .then(resp => {
            if (resp){
                next()
            }else res.status(404).json({message: `Action with that ID doesn't exist in the database`})
        })
        .catch(err => {
            console.err('error validating id: ', err)
        })
}

function validateActions(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({
            message: "Project name and description required"
        })
    } else next()
}


module.exports = {
    logger,
    validateActionsId,
    validateActions
}