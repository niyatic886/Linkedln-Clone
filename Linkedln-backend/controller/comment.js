const CommentModel = require('../models/comment');
const PostModel = require('../models/post');
const NotificationModel = require('../models/notification');



exports.commentPost = async (req, res) => {
     try {
        const { postId, comment } = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication
        const postExists = await PostModel.findById(postId).populate("user");
        if (!postExists) {
            return res.status(400).json({ error: 'Post not found' });
        }
        postExists.comments = postExists.comments + 1;
        await postExists.save();

        const newComment = new CommentModel({user: userId, post: postId, comment });
        await newComment.save();

        const populatedComment = await CommentModel.findById(newComment._id).populate('user', 'f_name headline profilePic').populate('post');

        const content =`${req.user.f_name} commented on your post`;
        const notification = new NotificationModel({sender: userId, receiver: postExists.user._id, type: 'comment', content, postId: postId.toString()});
        await notification.save();
        return res.status(200).json({ message: 'Commented successfully', comment: populatedComment });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
        }
}

exports.getCommentByPostId = async (req, res) => {
    try{
        const { postId } = req.params;
        const isPostExist = await PostModel.findById(postId);
        if(!isPostExist){
            return res.status(400).json({ error: 'Post not found' });
        }
        const comments = await CommentModel.find({ post: postId }).populate('user', 'f_name headline profilePic').sort({ createdAt: -1 });
       return res.status(200).json({ comments: comments, message: 'Comments fetched successfully' });

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
        }
}
