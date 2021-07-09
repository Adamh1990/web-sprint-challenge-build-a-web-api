// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(resp => {
            if (resp){
                next()
            }else res.status(404).json({message: `Project with that ID doesn't exist in the database`})
        })
        .catch(err => {
            console.err('error validating id: ', err)
        })
}

function validateProject(req, res, next) {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({
                message: 'missing required field',
            })
        } else {
            req.body.name.trim()
            next()
        }
}

module.exports = {
    validateProject,
    validateProjectId,
}