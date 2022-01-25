const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { Page, User } = require("../models");

router.get('/', async function (req, res, next){
  const pages = await Page.findAll();
  res.send(main(pages));

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

      const [user, isCreated] = await User.findOrCreate({
        where:{
          name: req.body.author,
          email: req.body.email
        }

      });

      await page.setAuthor(user);

      // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
      res.redirect(`/wiki/${page.slug}`);
    } catch (error) { next(error) }
  });

  router.get('/:slug', async function (req, res, next) {
    try{
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();
    // res.json(page);
    res.send(wikiPage(page, author));
  }catch(error){next(error)}
})

module.exports = router;
