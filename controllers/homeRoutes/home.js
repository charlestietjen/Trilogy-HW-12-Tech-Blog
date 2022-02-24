const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, Comment, User } = require('../../models/');

// landing page get all posts and render landing
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(posts)
        res.render('landing', {
            posts,
            loggedIn: req.session.loggedIn 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// view a single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id 
        },
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post)
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json
    })
})

// render login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;