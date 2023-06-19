const matiereService = require('../services/matiere.service');
const response = require('../helpers/response.helper');

const matiereController = (url , router) => {
    router.get( `${url}/`, (req, res) =>{
        matiereService.getAllMatieres(req.body).then(
            (matieres) => response.success(res, matieres, "Matières récupérées")
        ).catch( err => response.error(res, err.message));
    } );
}

module.exports = matiereController;