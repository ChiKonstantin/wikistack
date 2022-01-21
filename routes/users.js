const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');

router.get('/', function (req, res, next){

    res.send(userList());

});

router.get('/:id', function (req, res, next){

    res.send(userPages());

});

router.post('/', function (req, res, next){
    res.send('submit a new page to the database');
})

module.exports = router;