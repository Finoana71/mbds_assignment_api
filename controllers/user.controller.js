const userService = require('../services/user.service');
const response = require('../helpers/response.helper');

const userController = (url , router) => {


  // login
  router.post( `${url}/login`, (req, res) =>{
    const credentials = req.body;
     userService.login(credentials).then(
       (user) => response.success(res, user, "Log in success")
     ).catch( err => response.error(res, err.message));
  } );

  // inscription
  router.post( `${url}`, (req, res) => {
    userService.register(req.body).then(
      (user) => {
        console.log("Registration ok");
        response.success(res, user, "Registration success")
      }
    ).catch( err => {
      console.log(err);
      response.error(res, "An error occured during the registration");
     } );
  })

}

module.exports = userController;