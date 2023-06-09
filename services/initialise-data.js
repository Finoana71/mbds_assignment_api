const bcrypt = require("bcryptjs");

const Matiere = require('./../model/matiere'); 
const Eleve = require('./../model/eleve'); 
const User = require('./../model/user'); 

const matieres = require('./../data/matiere');
const eleves = require('./../data/eleve');
let users = require('./../data/user');

// Peupler la collection pour les matières
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

// Peupler la collection pour les élèves
function initializeEleve(){
    Eleve.deleteMany({})
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

// Peupler la collection pour les utilisateurs
function initializeUser(){
    User.deleteMany({})
    .then(() => {
        console.log('Données existantes supprimées avec succès');
        for(let user of users)
            user.motDePasse = bcrypt.hashSync(user.motDePasse); // Hacher les mots de passes
        User.insertMany(users)
        .then(()=> console.log("Utilisateurs inserés"))
        .catch((error)=>
            console.error('Erreur lors de l\'insertion des données utilisateurs :', error)
        );
    })
    .catch((error)=>
        console.error('Erreur lors de la suppression des données utilisateurs:', error)
    );
}

// Peupler la base de données
function initializeData(){
    // initializeMatiere();
    // initializeEleve();
    initializeUser();
}

module.exports = {initializeData}