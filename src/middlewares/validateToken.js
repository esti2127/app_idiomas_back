const jwt = require ('jsonwebtoken');
const generateToken = require('../utils/generateToken');

// Indica "qué requisitos" debe cumplir la petición para ser atendida.
const verifyToken = (req, res, next) => {

  try{

  //requerimos el encabezado llamado "Authorization". Si el cliente no envía el encabezado (undefined o null), header será un string vacío
  const header = req.header("Authorization") || "";
  //Nos quedamos solo con el token, porque no nos interesa la palabra "bearer" y lo guardamos en la variable "token"
  const token = header.split(" ")[1]

  //Si no escribimos el token en postman, no podemos acceder a la infomración deseada. 
  //Retornamos un "error 401" con el mensaje "token no proporcionado" 
  if (!token){
    return res.status(401).json({
      ok:false,
      message:"Token not provided"
    })
  }
 
    //Verificamos que el token sea auténtico (que no se haya alterado) y que no haya expirado usando nuestra llave secreta
    //Si el token no es válido salta directamente al catch
    const payload = jwt.verify( token, process.env.JWT_SECRET )

    //Si el token es válido, guardamos la información del usuario dentro de req
    req.user = payload;

    //Generamos un nuevo token pasandole a la función que lo genera la info del usuario que tenía el token viejo
    const newToken = generateToken(payload);

    //Guardamos el token nuevo en la petición para mandárselo al usuario en la respuesta
    //En el controlador, en el caso 200, el objeto json devolverá este newToken
    req.token = newToken;

    next();

  }catch(error){
    console.log(error)
    return res.status(403).json({
      ok: false, 
      message: "token not valid"
    })
  }

}

module.exports = verifyToken



//Lógica de la creación del token en la práctica: En el registro se crea un nuevo token (para que justo después de registrarse, 
// el usuario pueda navegar por la app con ese token) ---> en el login se crea un nuevo token ---> en los endpoints de las lecciones 
// el json me devuelve un nuevo token con la información del viejo (en el caso de haber ccedido directamente desde el registro, 
// el token nuevo creado en el proceso del endpoint tendrá la info del viejo generado en el registro. En cambio, si se accede desde el login, 
// el token nuevo del endpoint, tendrá la info del viejo creado en el login)


//Lógica del código: 
// traémos req que en el header tiene el token viejo (del registro o del login)
//En jwt.verify(token, secret) desempaquetamos el token viejo y extraemos el payload (la info. del user)
//En req.user = payload guardamos la info del user en el req
//En const newToken = generateToken(payload) le pasamos a la función que genera el nuevo token la info del user, y con esa info crea un nuevo token
//Con req.token = newToken guardamos ese nuevo token generado en el req para mandárselo al usuario