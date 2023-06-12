const assignmentService = require('../services/assignment.service');
const response = require('../helpers/response.helper');

const assignmentController = (url , router) => {

    router.post( `${url}/`, (req, res) =>{
        assignmentService.createAssignment(req.body).then(
        (assignment) => response.success(res, assignment, "Assignment created")
        ).catch( err => response.error(res, err.message));
    } );

    router.put( `${url}/:id`, (req, res) =>{
        assignmentService.updateAssignment(req.params.id, req.body).then(
        (assignment) => response.success(res, assignment, "Assignment updated")
        ).catch( err => response.error(res, err.message));
    } );

    router.delete( `${url}/:id`, (req, res) =>{
        assignmentService.deleteAssignment(req.params.id).then(
        () => response.success(res, undefined, "Assignment deleted")
        ).catch( err => response.error(res, err.message));
    } );
}

module.exports = assignmentController;