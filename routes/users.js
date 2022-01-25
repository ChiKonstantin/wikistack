const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { User, Page } = require("../models");

router.get('/', async function (req, res, next){
    try{
        const users = await User.findAll(); 
        res.send(userList(users));
    }catch(error){
        next(error);
    }
});

router.get('/:id', async function (req, res, next){
    const user = await User.findOne({
        where:{ 
            id: req.params.id
        }
    });
    const articles = await Page.findAll({
        where:{
            authorId: req.params.id
        }
    });
    res.send(userPages(user, articles));
});


router.post('/', function (req, res, next){
    res.send('submit a new page to the database');
})

module.exports = router;