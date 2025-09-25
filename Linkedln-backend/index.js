const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./connection');
require('dotenv').config({path: "./config.env"});


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));


const UserRoute = require('./routes/user');
const PostRoute = require('./routes/post');
const NotificationRoute = require('./routes/notification');
const CommentRoute = require('./routes/comment');
const ConversationRoute = require('./routes/conversation');
const MessageRoute = require('./routes/message');

app.use('/api/message', MessageRoute);

app.use('/api/comment', CommentRoute);
app.use('/api/conversation', ConversationRoute);
app.use('/api/notification', NotificationRoute);
app.use('/api/auth', UserRoute);
app.use('/api/post', PostRoute);

app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
});