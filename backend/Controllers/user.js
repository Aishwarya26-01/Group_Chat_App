const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../Models/user');

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true
    } else {
        return false
    }
}

const addUser = async (req, res) => {
    try{
        const { name, email, phonenumber, password } = req.body;
        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password) || isstringinvalid(phonenumber)){
            return res.status(400).json({err: "Bad parameters. Something is missing"})
        }

        const user = await User.findOne({where:{email}});
        console.log(user);
        if(user){
            return res.status(202).json({success:false,message:"Users Email or User Already Exist"})
        }

        if(user == null){
            const saltrounds = 10;
            bcrypt.hash(password, saltrounds, async (err, hash) => {
                console.log(err);
                await User.create({ name, email, phonenumber, password: hash })
                res.status(201).json({message: "New user created successfully", success:true})
            })
        }
    }catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    addUser
}