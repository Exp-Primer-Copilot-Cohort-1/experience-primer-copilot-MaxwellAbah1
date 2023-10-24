// Create web server



// Import modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Import data
const comments = require('../data/comments.json');

// Import functions
const { getNewId } = require('../lib/idGenerator');
const { writeDataToFile } = require('../lib/fileOperations');

// Create web server
router.get('/', (req, res) => {
    res.json(comments);
});

router.get('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
}
);

router.post('/', (req, res) => {
    const newComment = {
        id: getNewId(comments),
        ...req.body
    };

    if (!newComment.name || !newComment.comment) {
        return res.status(400).json({ msg: 'Please include a name and comment' });
    }

    comments.push(newComment);
    writeDataToFile('./data/comments.json', comments);
    res.json(comments);
});

router.put('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        const updComment = req.body;
        comments.forEach(comment => {
            if (comment.id === parseInt(req.params.id)) {
                comment.name = updComment.name ? updComment.name : comment.name;
                comment.comment = updComment.comment ? updComment.comment : comment.comment;

                res.json({ msg: 'Comment updated', comment });
            }
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

router.delete('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Comment deleted',
            comments: comments.filter(comment => comment.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

module.exports = router;