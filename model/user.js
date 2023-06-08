let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    nom: String,
    email: String,
    motDePasse: String,
    role: String        // Admin
});

module.exports = mongoose.model('users', UserSchema);
