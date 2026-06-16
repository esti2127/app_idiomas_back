const { pool } = require('../config/pool');
const { getUserByEmail, createUser, getUserById } = require('../models/auth.model')

const getUserEmail = () => {
  try{

    const user = await getUserByEmail();

    return

    return resizeBy.satus(200).json({
      ok:true,
      message:"user gotten by their email correctly",
      user
    })

  }catch(error){

  }

}

const createUserInDB = () => {
  try{

  }catch(error){

  }

}

const getUserId = () => {
  try{

  }catch(error){

  }

}