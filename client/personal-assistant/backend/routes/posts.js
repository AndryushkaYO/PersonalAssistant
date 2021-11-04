const express = require('express');
const router = express.Router();
const multer = require('multer');

const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .replace([')', '(', ':'],'')
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    mood: req.body.mood,
    date: req.body.date,
    isEdited: req.body.isEdited == 'true',
    isOpened: req.body.isOpened == 'true',
    labels: req.body.labels && typeof(req.body.labels) === 'string' 
      ? req.body.labels.split(',') 
      : [],
    imagePath: req.file && req.file.filename ? url + '/images/' + req.file.filename : ''
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();

  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.then((posts) => {
    fetchedPosts = posts;
    return Post.count();
  }).then((count) => {
    res.status(200).json({
      message: 'Posts sent successfully',
      posts: fetchedPosts,
      count
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({
        message: 'Post sent successfully',
        post
      });
    } else {
      res.status(404).json({
        message: 'Post not found!',
      });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then((posts) => {
    res.status(201).json({
      message: 'Post deleted successfully'
    });
  });  
});

router.put('/:id', multer({ storage: storage }).single('image'), (req, res, next) => {
  let imagePath;
  if (req.file) {
    imagePath = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
  } else {
    imagePath = req.body.image;
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    mood: req.body.mood,
    date: req.body.date,
    isEdited: req.body.isEdited,
    isOpened: req.body.isOpened,
    labels: typeof(req.body.labels) === 'string' ? req.body.labels.split(',') : req.body.labels,
    imagePath
  });
  Post.updateOne({ _id: req.params.id }, post).then(() => {
    res.status(200).json({
      message: 'Post updated successfully'
    });
  });  
});

module.exports = router;