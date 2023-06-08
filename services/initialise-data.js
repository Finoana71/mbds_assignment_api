const Matiere = require('./../model/matiere'); 
const Eleve = require('./../model/eleve'); 

const matieres = require('./../data/matiere');
const eleves = require('./../data/eleve');

function initializeMatiere(){
    Matiere.deleteMany({})
    .then(() => {
        console.log('Données existantes supprimées avec succès');

        Matiere.insertMany(matieres)
        .then(()=> console.log("Matières inserés"))
        .catch((error)=>
            console.error('Erreur lors de l\'insertion des données matières:', error)
        );
    })
    .catch((error)=>
        console.error('Erreur lors de la suppression des données matières:', error)
    );
}

function initializeEleve(){
    Matiere.deleteMany({})
    .then(() => {
        console.log('Données existantes supprimées avec succès');

        Eleve.insertMany(eleves)
        .then(()=> console.log("Elèves inserés"))
        .catch((error)=>
            console.error('Erreur lors de l\'insertion des données elèves :', error)
        );
    })
    .catch((error)=>
        console.error('Erreur lors de la suppression des données elèves:', error)
    );
}


function initializeData(){
    initializeMatiere();
    initializeEleve();
}

module.exports = {initializeData}