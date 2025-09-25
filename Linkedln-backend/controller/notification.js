const NotificationModal = require('../models/notification');


exports.getNotifications = async (req, res) => {
    try {
        let ownId = req.user._id;
        let notifications = await NotificationModal.find({ receiver: ownId }).sort({ createdAt: -1 }).populate("sender receiver", "-password");
        return res.status(200).json({ message: 'Notifications fetched successfully', notifications: notifications });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.updateRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const notification = await NotificationModal.findByIdAndUpdate(notificationId, { isRead: true });
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        return res.status(200).json({ message: 'Read Notification' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.activeNotify = async (req, res) => {
    try {
        let ownId = req.user._id;
        let notifications = await NotificationModal.find({ receiver: ownId, isRead: false });
        return res.status(200).json({ message: 'Active Notifications fetched successfully', count: notifications.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}