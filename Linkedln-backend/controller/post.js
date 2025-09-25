const PostModel = require('../models/post');

exports.addPost = async (req, res) => {
    try {
        const { desc, imageLink } = req.body;
        let userId = req.user._id;
        const addPost = new PostModel({ user: userId, desc, imageLink });
        if (!addPost) {
            return res.status(400).json({ error: 'Error while adding post' });
        }
        await addPost.save();
        return res.status(200).json({ message: 'Post added successfully', post: addPost });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.likeDislikePost = async (req, res) => {
    try {
        let selfId = req.user._id;
        let { postId } = req.body;
        let post = await PostModel.findById(postId);
        if (!post) {
            return res.status(400).json({ error: 'Post not found' });
        }
        const index = post.likes.findIndex(id => id.equals(selfId));
        if (index !== -1) {
            post.likes.splice(index, 1);
            //user has already liked the post, so we remove the like
        } else {
            post.likes.push(selfId);
            //user has not liked the post, so we add the like
        }
        await post.save();
        return res.status(200).json({ message: index !== -1 ? 'Post disliked' : 'Post liked', likes: post.likes });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        let posts = await PostModel.find().sort({ createdAt: -1 }).populate("user", "-password");
        return res.status(200).json({ message: 'Posts fetched successfully', posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getPostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId).populate("user", "-password");
        if (!post) {
            return res.status(400).json({ error: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post fetched successfully', post: post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getTop5PostForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId }).sort({ createdAt: -1 }).limit(5).populate("user", "-password");
        return res.status(200).json({ message: 'Top 5 posts fetched successfully', posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getAllPostForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId }).sort({ createdAt: -1 }).populate("user", "-password");
        return res.status(200).json({ message: 'All posts fetched successfully', posts: posts });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}