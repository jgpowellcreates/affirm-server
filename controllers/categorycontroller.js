const router = require('express').Router();
const {validateSession} = require('../middleware');
const {CategoryModel} = require('../models');
const Category = require('../models/category');

//Working! - might not need any validation? add user so guests can't access?
router.get('/', async (req,res) => {
    try {
        const allCategories = await CategoryModel.findAll();

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
        res.status(500).json({
            message: "Failed to create category",
            error: err
        })
    }
})

//Working! - needs Admin Validation
router.put('/edit-:categoryID', async (req, res) => {
    const {name} = req.body;
    const {categoryID} = req.params;

    const query = {
        where: {
            id: categoryID
        }
    };

    const changedCategory = name;

    try {
        const update = await CategoryModel.update(changedCategory, query);
        res.status(200).json({
            message: "Category successfully updated",
            newName: changedCategory})
    } catch(err) {
        res.status(500).json({
            message: "Unable to update category"
        })
    }
})

//Working! - needs Admin Validation
router.delete('/delete-:categoryID', async (req, res) => {
    const {categoryID} = req.params;

    try {
        const query = {
            where: {
                id: categoryID
            }
        };

        await CategoryModel.destroy(query);
        res.status(200).json({message: `Successfully deleted category`});
    } catch(err) {
        res.status(500).json({error: err})
    }
})

module.exports = router;