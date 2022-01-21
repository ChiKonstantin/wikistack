const express = require('express');
const morgan = require('morgan');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');


db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })


const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/wiki');
});

async function connector() {
    try {
        await db.sync({ force: true })
        app.listen(PORT, () => {
            console.log(`Listeting to port: ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}
connector();
