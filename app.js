const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config()

const sequelize = require('./backend/Utils/database');
const User = require('./backend/Models/user');
const userRoutes = require('./backend/Routes/user');

app.use(cors({
    origin:'*'
}));
app.use(bodyParser.json({extended:false}))

app.use('/user',userRoutes)

sequelize
    .sync()
    .then((res) => {
        app.listen(3000)
    })
    .catch(err=>console.log(err));