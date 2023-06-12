const assignmentService = require('../services/assignment.service');
const response = require('../helpers/response.helper');

const assignmentController = (url , router) => {

  router.post( `${url}/`, (req, res) =>{
     assignmentService.createAssignment(req.body).then(
       (assignment) => response.success(res, assignment, "Assignment created")
     ).catch( err => response.error(res, err.message));
  } );

}

module.exports = assignmentController;