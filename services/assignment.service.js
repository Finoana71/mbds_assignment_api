const { ObjectId } = require("mongodb");
const Assignment = require("../model/assignment");

// creer assignment
async function createAssignment(body){
    console.log("POST assignment reçu :");
    let assignment = createAssignmentObject(body); 
    assignment = await assignment.save();
    return assignment;
}

// Créer un objet assignment
function createAssignmentObject({id, nom, dateDeRendu, rendu, note, remarques, eleve, matiere}){
    let assignment = new Assignment();
    assignment.id = id;
    assignment.nom = nom;
    assignment.dateDeRendu = dateDeRendu;
    assignment.rendu = rendu;
    assignment.note = note;
    assignment.remarques = remarques;
    assignment.eleve = ObjectId(eleve);
    assignment.matiere = ObjectId(matiere);
    return assignment;
}


// Modifier assignment
async function updateAssignment(_id, body){
    return await Assignment.findByIdAndUpdate(_id, body, {new: true});
}

module.exports = {
    createAssignment,
    updateAssignment
}
