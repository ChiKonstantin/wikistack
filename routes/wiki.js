const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { Page } = require("../models");

router.get('/', function (req, res, next){

    res.send(main(''));

});

router.get('/add', function (req, res, next){

    res.send(addPage());

});

router.post('/', async (req, res, next) => {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`

    try {
      const page = await Page.create({
        title: req.body.title,
        content: req.body.text
      });

      // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
      res.redirect('/');
    } catch (error) { next(error) }
  });

  router.get('/:slug', async function (req, res, next) {
    let page = await Page //NOT FINSIHED
    res.json()
})

module.exports = router;
