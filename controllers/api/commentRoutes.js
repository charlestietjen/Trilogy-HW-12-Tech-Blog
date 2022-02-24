const router = require('express').Router();
const { User, Post, Comment } = require('../../models/')
const withAuth = require('../../utils/auth');

// get comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create comment - expects {text: 'example comment', user_id: 1, post_id: 1}
router.post('/', withAuth, (req, res) => {
    Comment.create({
        body: req.body.text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData){
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;