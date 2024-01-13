const User = require('../Models/user');
const Message = require('../Models/chat');

const sendMessage = async (req,res,next) => {
    try {
        const { message } = req.body;
        console.log(message)

        if (message == undefined || message.length === 0) {
            return res.status(400).json({ err: "Parameters Missing" });
        } else {
            const data = await Message.create({ message, userId:req.user.id });
            console.log("message sent from controller")
            res.status(200).json({ success:true ,name:req.user.name , message:data});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
}   

module.exports={
    sendMessage
}