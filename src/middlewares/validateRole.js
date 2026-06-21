
// Indica "qué requisitos" debe cumplir la petición para ser atendida.
//Esparcimos los roles que pueden acceder a los endpoints ---> esos roles se han especificado en los endpoints en routes
const validateRole = (...allowedRoles) => {

  return (req, res, next) => {

    //Si existen roles específicos que pueden acceder a x endpoints (que hemos especificado en rutas) y el rol del usuario no está en la lista de los roles permitidos 
    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      //devolvemos un "error 403" con un mensaje de acceso denegado
      return res.status(403).json({ ok: false, message: "Access denied" });
    }
    //y continuamos en el controlador
    next();
  };

}

//exportamos el middleware para poder usarlo en las rutas
module.exports = validateRole