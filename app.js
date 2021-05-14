const Express = require('express');
const app = Express();
const controllers = require('./controllers');


app.use('/auth', controllers.userController);
app.use('/role', controllers.rolesController);
app.use('/category', controllers.categoryController);
app.use('/collection', controllers.collectionController);
app.use('/affs', controllers.affirmationController);
app.use('/mycollections', controllers.userCollectionController);

app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000`);
});