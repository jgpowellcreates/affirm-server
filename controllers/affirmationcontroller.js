const router = require('express').Router();
const {AffirmationModel} = require('../models');
const {validateSession} = require('../middleware');

//FOR DEV - Retrieve all affirmations
router.get('/', async (req, res) => {
    try{
        const affirmations = await AffirmationModel.findAll();
        res.status(200).jsonp(affirmations);
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//Get all affirmations from a SITE collection
router.get('/collection-:collectionId', async (req, res) => {
    const {collectionId} = req.params;

    try{
        const affirmations = await AffirmationModel.findAll({
            where: {
                collectionId
            }
        });
        res.status(200).json(affirmation);
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//Get all affirmations from a USER collection
router.get('/collection-:userCollectionId', async (req, res) => {
    const {userCollectionId} = req.params;

    try{
        const affirmations = await AffirmationModel.findAll({
            where: {
                userCollectionId
            }
        });
        res.status(200).json(affirmation);
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//Creates a new affirmation statement
//...already takes in ownerRole & collection info. Need more validation?
router.post('/new', validateSession, async (req, res) => {
    const {statement, collectionId, userCollectionId} = req.body;
    const creatorRole = req.user.roleId;

    console.log(statement, collectionId, userCollectionId, creatorRole);
    try {
        const affirmation = await AffirmationModel.create({
            statement,
            ownerRole: creatorRole,
            collectionId,
            userCollectionId
        })

        res.status(201).json(affirmation)
    } catch(err) {
        res.status(500).json({
            message: "Couldn't create affirmation",
            error: err
        })
    };
});

//Edit an existing affirmation statement
router.put('/edit-:affirmationId', validateSession, async (req,res) => {
    const {statement} = req.body;
    const {affirmationId} = req.params;

    const query = {
        where: {
            id: affirmationId
        }
    }

    const udpatedStatement = {statement}

    try {
        const update = await AffirmationModel.findOne({
            where: {
                id: affirmationId
            }
        });

        if (req.user.roleId >= update.ownerRole) {

            update.statement = udpatedStatement.statement;
            await update.save();
        } else {
            res.status(401).json({message: "Not authorized."});
        }

        console.log(update)
        res.status(200).json({
            message: "Affirmation successfully updated",
            udpatedStatement
        })
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//DELETE TEST
router.delete('/delete-:affirmationId', validateSession, async (req, res) => {
    const {affirmationId} = req.params;

    try {
        const affToDelete = await AffirmationModel.findOne({
            where: {
                id: affirmationId
            }
        });

        if (req.user.roleId >= affToDelete.ownerRole){
            if (affToDelete) {
                affToDelete.destroy();
                res.status(200).json({message: `Successfully deleted affirmation`});
            } else {
                res.status(404).json({message: "No affirmation to delete"})
            }
        } else {
            res.status(401).json({message: "Not authorized."});
        }
    } catch (err) {
        res.status(500).json({error: err})
    }
})

module.exports = router;