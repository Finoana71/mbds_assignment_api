let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    nom: String,
    photo: String,
    photoProf: String
});

module.exports = mongoose.model('matieres', MatiereSchema);
