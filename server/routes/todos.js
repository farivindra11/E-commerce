var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET users listing. */
router.get('/', function (req, res, next) {
    models.Todo.findAll({}).then((todos) => {
        res.json(todos)
    }).catch((err) => {
        res.status(500).json(err)
    })
});

router.post('/', function (req, res) {
    models.Todo.create({
        title: req.body.title,
        UserId: req.body.userid
    }).then(function (todo) {
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err)
    })
});

router.get('/:id', function (req, res) {
    models.Todo.findByPk(req.params.id)
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err)
        })
});

router.put('/:id', function (req, res) {
    models.Todo.update({
        title: req.body.title,
        complete: req.body.complete
    }, {
        returning: true,
        where: {
            id: req.params.id
        }
    }).then((todo) => {
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err)
    })
});

router.delete('/:id', function (req, res) {
    models.Todo.destroy({
        returning: true,
        where: {
            id: req.params.id
        }
    }).then((todo) => {
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err)
    })
});

module.exports = router;
