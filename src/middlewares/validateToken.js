const jwt = require ('jsonwebtoken');
const generateToken = require('../utils/generateToken');


const verifyToken = (req, res, next) => {

  try{

  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1]

  if (!token){
    return res.status(401).json({
      ok:false,
      message:"Token not provided"
    })
  }
 
    const payload = jwt.verify( token, process.env.JWT_SECRET )

    req.user = payload;

    const newToken = generateToken(payload);

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