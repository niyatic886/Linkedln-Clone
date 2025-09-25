const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const NotificationModal = require('../models/notification');

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',

};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginThroughGmail = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { name, email, picture, sub } = payload;

        let userExist = await User.findOne({ email });

        if (!userExist) {
            userExist = await User.create({
                googleId: sub,
                f_name: name,
                email: email,
                profilePic: picture
            });

        }
        let JwtToken = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY);
        res.cookie('token', JwtToken, cookieOptions);

        return res.status(200).json({ user: userExist });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }

}


exports.register = async (req, res) => {
    try {
        let { f_name, email, password } = req.body;
        let isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ error: 'User already exists, Please try a different email' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log(hashedPassword);

        const newUser = new User({ f_name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully', success: "yes", data: newUser });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist && await bcryptjs.compare(password, userExist.password)) {
            let token = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY);
            res.cookie('token', token, cookieOptions);

            return res.json({ message: 'Login successful', success: "yes", userExist });
        } else {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { user } = req.body;
        const isExists = await User.findById(req.user._id);
        if (!isExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updateData = await User.findByIdAndUpdate(isExists._id, user);

        const userData = await User.findById(req.user._id);
        res.status(200).json({ message: 'User updated successfully', user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }

}

exports.getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const isExists = await User.findById(id)
        if (!isExists) {
            return res.status(400).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: "User found successfully", user: isExists });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}

exports.findUser = async (req, res) => {
    try {
        let { query } = req.query;
        const users = await User.find({

            $and: [
                { _id: { $ne: req.user._id } },
                {
                    $or: [
                        { name: { $regex: new RegExp(`^${query}`, 'i') } },
                        { email: { $regex: new RegExp(`^${query}`, 'i') } }
                    ]
                }
            ]
        });

        return res.status(201).json({ users: users, message: 'Users fetched successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.sendFriendRequest = async (req, res) => {
    try {
        const sender = req.user._id;
        const { receiver } = req.body;

        const userExist = await User.findById(receiver);
        if (!userExist) {
            return res.status(400).json({ error: 'User not found' });
        }
        const index = req.user.friends.findIndex(id => id.equals(receiver));
        if (index !== -1) {
            return res.status(400).json({ error: 'User is already your friend' });
        }

        const lastIndex = userExist.pending_friends.findIndex(id => id.equals(req.user._id));
        if (lastIndex !== -1) {
            return res.status(400).json({ error: 'Friend request already sent' });
        }

        userExist.pending_friends.push(sender);
        let content = `${req.user.f_name} has sent you a friend request`;
        const notification = new NotificationModal({ sender, receiver, content, type: 'friendRequest' });
        await notification.save();
        await userExist.save();
        return res.status(200).json({ message: 'Friend request sent successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.acceptFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.body;
        const selfId = req.user._id;

        if (selfId.equals(friendId)) {
            return res.status(400).json({ error: "You cannot add yourself as a friend" });
        }

        const friendData = await User.findById(friendId);
        if (!friendData) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!req.user.pending_friends.includes(friendId)) {
            return res.status(400).json({ error: "No friend request from this user" });
        }

        // update self
        await User.findByIdAndUpdate(selfId, {
            $pull: { pending_friends: friendId },
            $addToSet: { friends: friendId },   // 👈 prevents duplicates
        });

        // update friend
        await User.findByIdAndUpdate(friendId, {
            $addToSet: { friends: selfId },     // 👈 prevents duplicates
        });

        // notification
        const content = `${req.user.f_name} has accepted your friend request`;
        const notification = new NotificationModal({
            sender: selfId,
            receiver: friendId,
            content,
            type: "friendRequest",
        });
        await notification.save();

        return res.status(200).json({ message: "You both are now friends" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
};


exports.getFriendsList = async (req, res) => {
    try {
        let friendsList = await req.user.populate('friends');
        return res.status(200).json({ friends: friendsList.friends });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
};

exports.getPendingFriendsList = async (req, res) => {
    try {
        let pendingFriendsList = await req.user.populate('pending_friends');
        return res.status(200).json({ pendingFriends: pendingFriendsList.pending_friends });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
};

exports.removeFromFriend = async (req, res) => {
    try {
        let selfId = req.user._id;
        let { friendId } = req.params;

        const friendData = await User.findById(friendId);
        if (!friendData) {
            return res.status(400).json({ error: "User not found" });
        }

        const index = req.user.friends.findIndex(id => id.equals(friendId));
        const friendIndex = friendData.friends.findIndex(id => id.equals(selfId));
        if (index !== -1) {
            req.user.friends.splice(index, 1);
        } else {
            return res.status(400).json({ error: "No request from this user" });
        }

        if (friendIndex !== -1) {
            friendData.friends.splice(friendIndex, 1);
        } else {
            return res.status(400).json({ error: "No request from this user" });
        }

        await req.user.save();
        await friendData.save();
        return res.status(200).json({ message: "Removed from friends list successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
}