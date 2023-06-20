let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let userController = require('./controllers/user.controller');

let mongoose = require('mongoose');
const { initializeData } = require('./services/initialise-data');
const assignmentController = require('./controllers/assignment.controller');
const matiereController = require('./controllers/matiere.controller');
const eleveController = require('./controllers/eleve.controller');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri = 'mongodb+srv://Finoana:McLlEeH840Ixdtkj@cluster0.wmkf47q.mongodb.net/assignments?retryWrites=true&w=majority';
const uri = 'mongodb+srv://Finoana:McLlEeH840Ixdtkj@cluster0.wmkf47q.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    // initializeData();   // A commenter si on n'a plus besoin de peupler la base
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

// app.route(prefix + '/assignments')
//   .get(assignment.getAssignments)
//   .post(assignment.postAssignment)
//   .put(assignment.updateAssignment);

// app.route(prefix + '/assignments/:id')
//   .get(assignment.getAssignment)
//   .delete(assignment.deleteAssignment);

async function main(){
  app.listen(port, "0.0.0.0");
  userController(prefix + '/user', app);
  assignmentController(prefix + '/assignments', app);
  matiereController(prefix + '/matieres', app);
  eleveController(prefix + '/eleves', app);
}
  

// On démarre le serveur
main();
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


