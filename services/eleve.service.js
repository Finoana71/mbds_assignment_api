let Eleve = require('../model/eleve');

// Recuperer toutes les eleves
async function getAllEleves() {
    return await Eleve.find();
}

module.exports = {
    getAllEleves
}