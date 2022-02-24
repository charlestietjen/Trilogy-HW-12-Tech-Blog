const router = require('express').Router();
const { User, Post, Comment } = require('../../models/')
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: Comment,
                attriubtes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id 
        },
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model:Comment,
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
        if (!dbPostData){
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a post - {'title':'13 reasons why bean','body':'body of bean related article','user_id':1}
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// edit post - expects {title:'new title', text:'new text'}
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            body: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;