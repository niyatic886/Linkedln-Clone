const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://niyatic886_db_user:1TF7hz69crZ36uv4@cluster0.bfzlc33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(res=>{
    console.log("Database connected");
})
.catch(err=>{
    console.log(err);
});
