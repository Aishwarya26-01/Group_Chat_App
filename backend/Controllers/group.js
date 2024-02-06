const User = require('../Models/user');
const Chat = require('../Models/chat');
const Group = require('../Models/group');
const UserGroup = require('../Models/usergroup');

async function createNewGroup(req,res,next){
    const {groupName}=req.body;
    try {
        const group = await Group.create({groupName,createdBy:req.user.id});
        await UserGroup.create({groupId:group.id,userId:req.user.id});
        res.status(201).json({msg:`Successfully Created group ${groupName}`})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"No Group created",error})

    }
}

async function getAllGroups(req,res,next){
    try {
        const user = await User.findOne({where : {id:req.user.id}});
        const groups = await user.getGroups();
        res.status(201).json({groups,success:true})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Cannot Get Groups',error})
    }
}

module.exports  = {
    createNewGroup,
    getAllGroups
}