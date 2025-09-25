const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const Authentication = require('../authentication/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user/:id', UserController.getProfileById);
router.post('/logout', Authentication.auth, UserController.logout);

router.put('/update', Authentication.auth, UserController.updateUser);
router.post('/google', UserController.loginThroughGmail);
router.get('/self', Authentication.auth, (req, res) => {
    res.status(200).json({ user: req.user });
    
});

router.get('/findUser', Authentication.auth, UserController.findUser);
router.post('/sendFriendReq', Authentication.auth, UserController.sendFriendRequest);
router.post('/acceptFriendRequest', Authentication.auth, UserController.acceptFriendRequest);
router.get('/friendsList', Authentication.auth, UserController.getFriendsList);
router.get('/pendingFriendsList', Authentication.auth, UserController.getPendingFriendsList);
router.delete('/removeFromFriendsList/:friendId', Authentication.auth, UserController.removeFromFriend);

module.exports = router;