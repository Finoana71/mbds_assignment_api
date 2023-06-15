module.exports = {
    success : function(res, data,message){
      res.json( {
        code : 202,
        data : data,
        message : message
      } )
    },
    error : function(res, message, code = 400 ){
      res.status(code).send( {
        code : code,
        message : message
      } )
    },
    errorCatch: function(res, err){
      res.status(code).send( {
        code : err.code ?? 500,
        message : err.code? err.message: "Une erreur s'est produite"
      } )
    }
  }
  