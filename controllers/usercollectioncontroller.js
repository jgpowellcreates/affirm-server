const router = require('express').Router();
const {UserCollectionModel, AffirmationModel} = require('../models');
const {validateSession} = require('../middleware');

//This endpoint for developer. All collections should be returned under categories.
router.get('/all', async (req, res) => {
    try {
        const userCollections = await UserCollectionModel.findAll({include: AffirmationModel});
        res.status(200).json(userCollections);
    } catch(err) {
        res.status(500).json({error: err})
    }
});

//User can see all their collections (My Practice)
router.get('/', validateSession, async (req, res) => {
    const userId = req.user.id;

    try {
        const userCollection = await UserCollectionModel.findAll({
            where: {
                userId
            },
            include: AffirmationModel
        });
        res.status(200).json({userCollection});
    } catch(err) {
        res.status(500).json({error: err})
    }
});

//Create a new user collection
router.post('/new', validateSession, async (req, res) => {
    const {title, description} = req.body;
    const userId = req.user.id;
    const ownerRole = req.user.roleId;

    try{
        const newUserCollection = await UserCollectionModel.create({
            title,
            description,
            ownerRole,
            userId
        });

        res.status(201).json({
            message: "New Collection Created!",
            newUserCollection,
        })
    } catch(err) {
        res.status(500).json({
            message: "Failed to create collection",
            error: err
        })
    }
})

//Edit a user collection (Name, Description)
router.put('/edit-:userCollectionId', validateSession, async (req, res) => {
    const {title, description} = req.body;
    const {userCollectionId} = req.params;
    const userId = req.user.id;

    const query = {
        where: {
            id: userCollectionId,
            userId
        }
    }

    const updatedUserCollection = {
        title,
        description,
    }

    try {
        const update = await UserCollectionModel.update(updatedUserCollection, query);
        if(update >= 1) {
            res.status(200).json({
                message: "Collection successfully updated",
                collectionInfo: updatedUserCollection
            });
        } else {
            res.status(401).json({message: "No Collection / Collection could not be updated"})
        }
    } catch(err) {
        res.status(500).json({
            message: "Unable to update collection",
        })
    }
});

//Delete a user collection
router.delete('/delete-:userCollectionId', validateSession, async (req,res) => {
    const {userCollectionId} = req.params;
    const userId = req.user.id;

    try {
        const query = {
            where: {
                id: userCollectionId,
                userId
            }
        };

    let rowsDestroyed = await UserCollectionModel.destroy(query);
    if (rowsDestroyed >= 1) {
        res.status(200).json({message: `Successfully deleted collection`});
    } else {
        res.status(404).json({message: "No Collection / Collection could not be deleted"})
    }
} catch(err) {
    res.status(500).json({error: err})
}
})

module.exports = router;