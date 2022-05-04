const express = require('express');
const router = express.Router();
const {userCtrl} = require('../controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* User */
router.post('/signup', userCtrl.signUp)
router.post('/signin', userCtrl.signIn)
router.post('/emailcheck', userCtrl.checkEmail)
router.post('/usernamecheck', userCtrl.checkUsername)

module.exports = router;
