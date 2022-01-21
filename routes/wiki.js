const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');

router.get('/', function (req, res, next){

    res.send(main(''));

});

router.get('/add', function (req, res, next){

    res.send(addPage());

});

router.post('/', function (req, res, next){
    res.send(req.body.email);
})

module.exports = router;