const jwt = require ('jsonwebtoken')


const verifyToken = (req, res, next) => {

  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1]
  if (!token){
    return res.status(401).json({
      ok:false,
      message:"Token not provided"
    })
  }
  try{
    const payload = jwt.verify( token, process.env.JWT_SECRET )

    req.user = payload;

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