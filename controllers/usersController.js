const User = require('../models/Users');
const bcrypt = require('bcrypt')

const getAllUsers = async(req,res) => {
    const users = await User.find();
    if(!users)
        return res.status(204).json({"message":"No users found"});
    res.json(users);
}

const deleteUser = async(req,res) => {
    if(!req?.body?.id)
        return res.status(400).json({"message":"User ID required"});
    const user = await User.findOne({_id: req.body.id}).exec();
    if(!user)
    {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({_id: req.body.id});
    console.log(result);
}

const getUserJWT = async(req,res) => {
    if(!req.user)
        return res.status(400).json({ "message": 'User must be logged in' });
    const user = await User.findOne({ username:req.user}).exec();
    if(!user)
    {
        return res.status(204).json({'message': `Username ${req.params.id} not found` })
    }
    // API is avaiable to everyone we will use this as a secert protecter
    user.password = "SECRET-PASSWORD";
    user.refreshToken = "SECERT-REFRESH";
    res.json(user);
}

const getUser = async(req,res) => {
    if(!req.params?.id)
        return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id:req.params.id}).exec();
    if(!user)
    {
        return res.status(204).json({'message': `User ID ${req.params.id} not found` })
    }
    // API is avaiable to everyone we will use this as a secert protecter
    user.password = "SECRET-PASSWORD";
    user.refreshToken = "SECERT-REFRESH";
    console.log(user)
    res.json(user);
}

const updateUser = async (req, res) => {
    if (!req?.body?.id) {
      return res.status(400).json({ "message": 'User ID required' });
    }

    if(req?.body === undefined)
    return res.status(404).json({"message":"Missing few fields in user data."});
   
    const {username,password,firstname,lastname,email, confirm} = req.body;
    if(!req?.body?.username ||
        !req?.body?.password ||
        !req?.body?.firstname ||
        !req?.body?.lastname ||
        !req?.body?.email || 
        !req?.body?.confirm)
        return res.status(404).json({"message":"Missing few fields in user data."});
    
    if(req?.body?.password !== req?.body?.confirm)
       return res.status(404).json({"message":"Some fields does not meet the requrements."});
    
    const duplicatedEmail = await User.findOne({email:req?.body?.email});

    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      console.log(req.body);
      const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ 'message': `User ID ${req.body.id} not found` });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ "message": "Internal server error" });
    }
  };

module.exports = {
    getAllUsers,
    deleteUser,
    getUserJWT,
    getUser,
    updateUser
}