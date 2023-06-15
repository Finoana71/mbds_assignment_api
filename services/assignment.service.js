const { ObjectId } = require("mongodb");
const Assignment = require("../model/assignment");
const { MyError } = require("../helpers/error.helper");

const eleveService = require("./eleve.service");
const matiereService = require("./matiere.service");
const util = require("./../helpers/util.helper");

// creer assignment
async function createAssignment(body){
    console.log("POST assignment reçu :");
    let assignment = createAssignmentObject(body); 
    await validateAssignment(assignment);
    assignment = await assignment.save();
    return assignment;
}

// Créer un objet assignment
function createAssignmentObject({id, nom, dateDeRendu, rendu, note, remarques, eleve, matiere}){
    if(!util.isHexadecimal(eleve))
        throw new MyError(`Veuillez renseigner un élève valide`, 400);        
    if(!util.isHexadecimal(matiere))
        throw new MyError(`Veuillez renseigner un élève valide`, 400);        
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

function verifyRequiredAttribute(assignment){
    const attributes = ["id", "nom", "eleve", "matiere"];
    const attributeNames = ["Id", "Nom", "Elève", "Matière"];
    for(let i = 0; i < attributes.length; i++){
        if(!assignment[attributes[i]])
            throw new MyError(`Veuillez renseigner une valeur pour l'attribut "${attributeNames[i]}"`, 400);        
    }
}

// Valider un objet assignment
async function validateAssignment(assignment, _id = null){
    verifyRequiredAttribute(assignment);
    const otherAssignment = await Assignment.findOne({id: assignment.id});
    if(otherAssignment && _id && otherAssignment._id != ObjectId(_id))
        throw new MyError(`Un assignment avec cet id "${assignment.id}" existe déjà`, 400);        
    const eleve = await eleveService.findById(assignment.eleve);
    if(!eleve)
        throw new MyError(`Veuillez renseigner un élève valide`, 400);        
    const matiere = await matiereService.findById(assignment.matiere);
    if(!matiere)
        throw new MyError(`Veuillez renseigner une matière valide`, 400);        
}

// Modifier assignment
async function updateAssignment(id, body){
    await validateAssignment(body, id);
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
