const router = require('express').Router();
const {RoleModel} = require('../models');

//FOR DEVELOPMENT ONLY. Finding all created roles
router.get('/', async (req, res) => {
    try{
        const roles = await RoleModel.findAll({
        });

        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({error: err})
    }
})

//FOR DEVELOPMENT ONLY. (Quickly repopulate role table when reset is necessary)
router.post('/make', async (req, res) => {
    const {status} = req.body;

    try {
        const makeRole = await RoleModel.create({
            status
        })

        res.status(200).json({message: "Role created", makeRole})
    } catch(err) {
        res.status(500).json({error:err})
    }
});

module.exports = router;