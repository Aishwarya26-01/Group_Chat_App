const User = require('../Models/user');
const Chat = require('../Models/chat');

const {Op}=require('sequelize')

const sendMessage = async (req,res,next) => {
    try {
        const { message, groupId } = req.body;
        console.log(message, groupId)

        if (message == undefined || message.length === 0) {
            return res.status(400).json({ err: "Parameters Missing" });
        } else {
            const chat = await Chat.create({ message, name:req.user.name, userId:req.user.id, groupId, text: 'text' });
            console.log("message sent from controller")
            res.status(200).json({ success:true , name:req.user.name, message:chat, userId:req.user.id});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
}

const getMessage = async (req, res) => {
    const groupId=req.query.groupId;
    console.log('>>>>groupId',groupId);
    try{
        const chat = await Chat.findAll({where:{ groupId }});
        res.status(202).json({ allChat:chat, success:true });
    } catch(err) {
        console.log('Get message is failing', JSON.stringify(err));
        res.status(500).json(err);
    }
}

module.exports={
    sendMessage,
    getMessage
}