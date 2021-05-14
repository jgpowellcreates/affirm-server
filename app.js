require("dotenv").config();
const Express = require('express');
const app = Express();
const controllers = require('./controllers');
const dbConnection = require('./db');
const middlewares = require('./middleware');
const validateJWT = require('./middleware/validate-session');

app.use(middlewares.CORS);
app.use(Express.json());

app.use('/auth', controllers.userController);
app.use('/role', controllers.rolesController);
app.use('/category', controllers.categoryController);
app.use('/collection', controllers.collectionController);
app.use('/affs', controllers.affirmationController);
app.use('/mycollections', controllers.userCollectionController);

dbConnection.authenticate()
    .then(() => dbConnection.sync({force: true}))
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed due to ${err}`)
    });