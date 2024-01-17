const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const generateAccessToken = (id) => {
    return jwt.sign({userId: id}, "secretkey");
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({message: "email id or password is missing", success: false})
        }
        const user = await User.findAll({ where: { email } })
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err){
                    return res.status(500).json({success: false, message: "Something went wrong"})
                }
                if(result === true){
                    return res.status(200).json({success: true, message: "User logged in successfully", 
                        token: generateAccessToken(user[0].id)})
                } else {
                    return res.status(400).json({success: false, message: "Password is incorrect"})
                }
            })
        } else {
            return res.status(404).json({success: false, message: "User does not exists, please signup"})
        }
    }catch(err) {
        res.status(500).json({ message: err, success: false });
    }
}

module.exports = {
    addUser,
    loginUser,
    generateAccessToken
}