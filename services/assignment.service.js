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
async function updateAssignment(id, body){
    return await Assignment.findByIdAndUpdate(id, body, {new: true});
}

// suppression d'un assignment (DELETE)
async function deleteAssignment(id) {
    return await Assignment.findByIdAndRemove(id);
}

// Recuperer les assignments avec pagination 
async function getAssignments(page, limit) {
    var aggregateQuery = Assignment.aggregate();

    const options = {page, limit};
    const result = await Assignment.aggregatePaginate(aggregateQuery, options);
    const assignments = result.docs;

    await Assignment.populate(assignments, { path: "eleve" });
    await Assignment.populate(assignments, { path: "matiere" });

    return assignments;
}

// Recuperer un assignment par id 
async function findAssignmentById(id){
    let assignment = await Assignment.findById(id)
        .populate(['eleve', 'matiere']);
    return assignment;
}
module.exports = {
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignments,
    findAssignmentById
}
