const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    findUser, 
    getAllUsers 
} = require('../controllers/userController');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/find/:userId', findUser)
router.get('/', getAllUsers)

module.exports = router;