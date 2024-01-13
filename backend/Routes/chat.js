const express = require('express');
const router = express.Router();

const chatController = require('../Controllers/chat');
const middleware = require('../Middleware/auth');

router.post('/sendmessage', middleware.authenticate, chatController.sendMessage);

module.exports = router;