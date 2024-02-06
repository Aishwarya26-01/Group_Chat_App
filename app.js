const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config()

const sequelize = require('./backend/Utils/database');
const User = require('./backend/Models/user');
const Message = require('./backend/Models/chat');
const Group = require('./backend/Models/group');
const UserGroup = require('./backend/Models/usergroup');
const userRoutes = require('./backend/Routes/user');
const chatRoutes = require('./backend/Routes/chat');
const groupRoutes = require('./backend/Routes/group');

app.use(cors({
    origin:'*'
}));
app.use(bodyParser.json({extended:false}))

app.use('/user',userRoutes)
app.use('/chat',chatRoutes)
app.use('/chat',chatRoutes)
app.use(groupRoutes)

User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User,{through:UserGroup});
User.belongsToMany(Group,{through:UserGroup})

Group.hasMany(Message);
Message.belongsTo(Group);

sequelize
    .sync()
    // .sync({force: true})
    .then((res) => {
        app.listen(3000)
    })
    .catch(err=>console.log(err));