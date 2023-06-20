const bcrypt = require("bcryptjs");

const Assignment = require('./../model/assignment'); 
const Matiere = require('./../model/matiere'); 
const Eleve = require('./../model/eleve'); 
const {User} = require('./../model/user'); 

const matieres = require('./../data/matiere');
const eleves = require('./../data/eleve');
let users = require('./../data/user');
let assignments = require("./../data/assignement");

// Peupler la collection pour les matières
function initializeMatiere(){
    Matiere.deleteMany({})
    .then(() => {
        console.log('Données existantes supprimées avec succès pour les matières');

        Matiere.insertMany(matieres)
        .then(()=> {
            console.log("Matières inserés");
            initializeEleve();
        })
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
        console.log('Données existantes supprimées avec succès pour les élèves');

        Eleve.insertMany(eleves)
        .then(()=> {
            console.log("Elèves inserés");
            initializeAssignments();
        })
        .catch((error)=>
            console.error('Erreur lors de l\'insertion des données elèves :', error)
        );
    })
    .catch((error)=>
        console.error('Erreur lors de la suppression des données elèves:', error)
    );
}

// Peupler la collection pour les assignments
function initializeAssignments() {
    Assignment.deleteMany({})
      .then(() => {
        console.log('Données existantes supprimées avec succès');
        const assignmentPromises = assignments.map(async (assignment) => {
          const newAssignment = new Assignment(assignment);
          try {
            // Générer un index aléatoire pour choisir un élève et une matière parmi ceux déjà insérés
            const randomEleveIndex = Math.floor(Math.random() * eleves.length);
            const randomMatiereIndex = Math.floor(Math.random() * matieres.length);
  
            // Récupérer les références d'élève et de matière correspondant aux index aléatoires
            const eleve = await Eleve.findOne().skip(randomEleveIndex);
            const matiere = await Matiere.findOne().skip(randomMatiereIndex);
  
            // Assigner les références d'élève et de matière à l'assignment
            newAssignment.eleve = eleve._id;
            newAssignment.matiere = matiere._id;
  
            await newAssignment.save();
            console.log("Assignment inséré avec les références d'élève et de matière");
          } catch (error) {
            console.error('Erreur lors de l\'insertion de l\'assignment:', error);
          }
        });
        Promise.all(assignmentPromises)
          .then(() => {
            console.log("Assignments insérés");
          })
          .catch((error) =>
            console.error('Erreur lors de l\'insertion des données assignments:', error)
          );
      })
      .catch((error) =>
        console.error('Erreur lors de la suppression des données assignments:', error)
      );
  }
  
// Peupler la collection pour les utilisateurs
function initializeUser(){
    User.deleteMany({})
    .then(() => {
        console.log('Données existantes supprimées avec succès pour les utilisateurs');
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
    initializeUser();
    initializeMatiere();
}

module.exports = {initializeData}