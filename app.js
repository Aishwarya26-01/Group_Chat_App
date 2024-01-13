const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config()

const sequelize = require('./backend/Utils/database');
const User = require('./backend/Models/user');
const Message = require('./backend/Models/chat');
const userRoutes = require('./backend/Routes/user');
const chatRoutes = require('./backend/Routes/chat');

app.use(cors({
    origin:'*'
}));
app.use(bodyParser.json({extended:false}))

app.use('/user',userRoutes)
app.use('/chat',chatRoutes)

User.hasMany(Message);
Message.belongsTo(User);

sequelize
    .sync()
    // .sync({force: true})
    .then((res) => {
        app.listen(3000)
    })
    .catch(err=>console.log(err));