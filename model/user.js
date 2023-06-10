let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    nom: String,
    email: String,
    motDePasse: String,
    role: String        // Admin
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.motDePasse
    }
})

const User =  mongoose.model("user", UserSchema);

module.exports = {User, UserSchema}