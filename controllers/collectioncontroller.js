const router = require('express').Router();
const {CollectionModel, AffirmationModel} = require('../models');
const { UniqueConstraintError } = require("sequelize/lib/errors")
const {validateSession} = require('../middleware');

//This endpoint for developer. All collections should be returned under categories.
router.get('/', async (req, res) => {
    try {
        const collections = await CollectionModel.findAll({include: AffirmationModel});
        res.status(200).json(collections);
    } catch(err) {
        res.status(500).json({error: err})
    }
});

//Viewing a single collection's contents
router.get('/:collectionId', async (req, res) => {
    const {collectionId} = req.params;
    try {
        const collection = await CollectionModel.findOne({
            where: {
                id: collectionId,
            },
            include: AffirmationModel
        });
        res.status(200).json(collection);
    } catch(err) {
        res.status(500).json({error: err})
    }
});

router.post('/new', validateSession, async (req, res) => {
    const {title, description, bannerImg, categoryId} = req.body;

    if(req.user.roleId == process.env.ADMIN_ROLE) {
        try{
            const newCollection = await CollectionModel.create({
                title,
                description,
                bannerImg,
                categoryId
            });

            res.status(201).json({
                message: "New Collection Created!",
                newCollection
            })
        } catch(err) {
            res.status(500).json({
                message: "Failed to create collection",
                error: err
            })
        }
    } else {
        res.status(401).json({message: "Not authorized."});
    }
})


router.put('/edit-:collectionId', validateSession, async (req, res) => {
    const {title, description, bannerImg, isPublic, categoryId} = req.body;
    const {collectionId} = req.params;

    const query = {
        where: {
            id: collectionId
        }
    }

    const updatedCollection = {
        title,
        description,
        bannerImg,
        isPublic,
        categoryId
    }

    if(req.user.roleId == process.env.ADMIN_ROLE) {
        try {
            const update = await CollectionModel.update(updatedCollection, query);
            res.status(200).json({
                message: "Collection successfully updated",
                collectionInfo: updatedCollection
            });
        } catch(err) {
            res.status(500).json({
                message: "Unable to update collection",
            })
        }
    } else {
        res.status(401).json({message: "Not authorized."});
    }
});


router.delete('/delete-:collectionId', validateSession, async (req,res) => {
    const {collectionId} = req.params;

    if(req.user.roleId == process.env.ADMIN_ROLE) {
        try {
            const query = {
                where: {
                    id: collectionId
                }
            };

            console.log(query);
            let rowsDestroyed = await CollectionModel.destroy(query);
            if (rowsDestroyed >= 1) {
                res.status(200).json({message: `Successfully deleted collection`});
            } else {
                res.status(404).json({message: "No collection to delete"})
            }
        } catch(err) {
            res.status(500).json({error: err})
        }
    } else {
        res.status(401).json({message: "Not authorized."});
    }
})

module.exports = router;