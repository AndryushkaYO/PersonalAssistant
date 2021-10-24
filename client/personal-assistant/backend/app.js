const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

const Post = require('./models/post');

mongoose.connect('mongodb+srv://andri:aBOrizylgqDBErup@cluster0.cyhq4.mongodb.net/personal-assistant-db?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to Database');
})
.catch(() => {
  console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: 'Posts sent successfully',
      posts
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then((posts) => {
    res.status(201).json({
      message: 'Post deleted successfully'
    });
  });  
});

module.exports = app;