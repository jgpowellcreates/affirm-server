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

router.post('/new', validateSession, async (req, res) => {
    const {statement, collectionId, userCollectionId} = req.body;
    const {ownerRole} = req.user.roleId;

    console.log(statement, collectionId, userCollectionId, ownerRole);
    try {
        console.log("Trying...")
        const affirmation = await AffirmationModel.create({
            statement,
            ownerRole,
            collectionId,
            userCollectionId
        })
        console.log("Made it past affirmation")

        res.status(201).json(affirmation)
    } catch(err) {
        res.status(500).json({
            message: "Couldn't create affirmation",
            error: err
        })
    };
});

router.put('/edit-:affirmationId', validateSession, async (req,res) => {
    const {statement} = req.body;
    const {affirmationId} = req.params;

    const query = {
        where: {
            id: affirmationId
        }
    }

    const udpatedStatement = {
        statement
    }

    try {
        const update = await AffirmationModel.update(udpatedStatement,query);
        res.status(200).json({
            message: "Affirmation successfully updated",
            udpatedStatement
        })
    } catch(err) {
        res.status(500).json({error: err})
    }
})

router.delete('/delete-:affirmationId', validateSession, async (req, res) => {
    const {affirmationId} = req.params;

    try {
        const query = {
            where: {
                id: affirmationId
            }
        };

        let rowsDestroyed = await AffirmationModel.destroy(query);
        if (rowsDestroyed >= 1) {
            res.status(200).json({message: `Successfully deleted affirmation`});
        } else {
            res.status(404).json({message: "No affirmation to delete"})
        }
    } catch(err) {
        res.status(500).json({error: err})
    }
})

module.exports = router;