const {validationResult} = require ('express-validator');

const validateInputs = (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      ok:false,
      //errors: errors.mapped. Lo que dijo Rafa de que devuelve un objeto en vez del array y entonces fuera del objeto aparecerían los campos como clave
      errors: errors.array
    })
  }

  // console.log(errors)

  next()
  
}

module.exports = validateInputs

