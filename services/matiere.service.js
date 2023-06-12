let Matiere = require('../model/matiere');

// Recuperer toutes les matières
async function getAllMatieres() {
    return await Matiere.find();
}

module.exports = {
    getAllMatieres
}