const assignmentService = require('../services/assignment.service');
const response = require('../helpers/response.helper');

const assignmentController = (url , router) => {

    router.post( `${url}/`, (req, res) =>{
        assignmentService.createAssignment(req.body).then(
            (assignment) => response.success(res, assignment, "Assignment created")
        ).catch( err => response.error(res, err));
    } );

    router.put( `${url}/:id`, (req, res) =>{
        assignmentService.updateAssignment(req.params.id, req.body).then(
            (assignment) => {
                if(assignment)
                    response.success(res, assignment, "Assignment updated")
                else
                    response.error(res, "Assignment not found", 404);   
        }).catch( err => response.error(res, err));
    } );

    router.delete( `${url}/:id`, (req, res) =>{
        assignmentService.deleteAssignment(req.params.id).then(
            (assignment) => {
                if(assignment)
                    response.success(res, null, "Assignment deleted")
                else
                    response.error(res, "Assignment not found", 404);   
            }
        ).catch( err => response.error(res, err));
    } );

    router.get( `${url}/`, (req, res) =>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        assignmentService.getAssignments(page, limit).then(
            (assignments) => response.success(res, assignments, "Assignments retrieved")
        ).catch( err => response.error(res, err));
    } );

    router.get( `${url}/:id`, (req, res) =>{
        assignmentService.findAssignmentById(req.params.id).then(
            (assignment) => {
                if(assignment)
                    response.success(res, assignment, "Assignment retrieved");
                else
                    response.error(res, "Assignment not found", 404);
            }
        ).catch( err => response.error(res, err));
    } );

}

module.exports = assignmentController;