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
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed due to ${err}`)
    });