const express = require('express');
const router = express.Router();

const userControlller = require('../Controllers/user');

router.post('/signup',userControlller.addUser);
router.post('/login',userControlller.loginUser);

module.exports = router;
