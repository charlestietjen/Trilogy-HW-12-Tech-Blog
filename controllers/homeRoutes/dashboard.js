const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            id: req.session.user_id
        },
        attributes: ['id', 'title', 'body', 'created_at'],
        include: {
            model: Comment,
            attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(posts);
        res.render('dashboard', {
            posts
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;