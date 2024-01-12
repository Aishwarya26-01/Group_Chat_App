const express = require('express');
const router = express.Router();

const userControlller = require('../Controllers/user');

router.post('/signup',userControlller.addUser);

module.exports = router;
