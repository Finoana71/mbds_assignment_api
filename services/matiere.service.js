let Matiere = require('../model/matiere');

// Recuperer toutes les matières
async function getAllMatieres() {
    return await Matiere.find();
}

async function findById(id){
    return await Matiere.findById(id);
}

module.exports = {
    getAllMatieres,
    findById
}