let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EleveSchema = Schema({
    nom: String,
    photo: String
});

module.exports = mongoose.model('eleves', EleveSchema);
