let Eleve = require('../model/eleve');

// Recuperer toutes les eleves
async function getAllEleves() {
    return await Eleve.find();
}

async function findById(id){
    return await Eleve.findById(id);
}

module.exports = {
    getAllEleves,
    findById
}