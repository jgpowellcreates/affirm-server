const router = require('express').Router();
const {CategoryModel, CollectionModel} = require('../models');
const { UniqueConstraintError } = require("sequelize/lib/errors")
const {validateSession} = require('../middleware');


//Working! - might not need any validation? add user so guests can't access?
router.get('/', async (req,res) => {
    try {
        const allCategories = await CategoryModel.findAll({
            include: CollectionModel
        });

        res.status(200).json(allCategories);
    } catch(err) {
        res.status(500).json({
            error:err
        })
    }
})

//Working! - needs Admin Validation
router.post('/new', async (req, res) => {
    const {name} = req.body;
    try {
        const Category = await CategoryModel.create({
            name
        })

        res.status(201).json({
            message: `Category '${name}' successfully created`,
            Category
        })
    } catch(err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Category already exists"
            })
        } else {
            res.status(500).json({
                message: "Failed to create category",
                error: err
            })
        }
    }
})

//Working! - needs Admin Validation
router.put('/edit-:categoryId', async (req, res) => {
    const {name} = req.body;
    const {categoryId} = req.params;

    const query = {
        where: {
            id: categoryId
        }
    };

    const updatedCategory = name;

    try {
        const update = await CategoryModel.update(updatedCategory, query);
        res.status(200).json({
            message: "Category successfully updated",
            newName: updatedCategory})
    } catch(err) {
        res.status(500).json({
            message: "Unable to update category"
        })
    }
})

//Working! - needs Admin Validation
router.delete('/delete-:categoryId', async (req, res) => {
    const {categoryId} = req.params;

    try {
        const query = {
            where: {
                id: categoryId
            }
        };

        let rowsDestroyed = await CategoryModel.destroy(query);
        if (rowsDestroyed >= 1) {
            res.status(200).json({message: `Successfully deleted category`});
        } else {
            res.status(404).json({message: "No category to delete"})
        }
    } catch(err) {
        res.status(500).json({error: err})
    }
})

module.exports = router;