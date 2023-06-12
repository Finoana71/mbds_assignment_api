const eleveService = require('../services/eleve.service');
const response = require('../helpers/response.helper');

const eleveController = (url , router) => {
    router.get( `${url}/`, (req, res) =>{
        eleveService.getAllEleves(req.body).then(
            (eleves) => response.success(res, eleves, "Elèves récupérés")
        ).catch( err => response.error(res, err.message));
    } );
}

module.exports = eleveController;