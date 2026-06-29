const jwt = require ('jsonwebtoken')

const generateToken = (user) => {
  // console.log(process.env.JWT_SECRET)
      return jwt.sign({id: user.id_user, role: user.role}, process.env.JWT_SECRET, { expiresIn: "4h" })
    }

module.exports = generateToken