const router = require('express').Router();
const {UserModel, RoleModel, UserCollectionModel, AffirmationModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const validateSession = require('../middleware/validate-session');
const {UniqueConstraintError} = require('sequelize/lib/errors');

router.get('/', validateSession, async (req, res) => {
    const userId = req.user.id;

    try{
        const foundUser = await UserModel.findOne({
            where: {
                id: userId
            },
            include: {
                model: UserCollectionModel,
                include: AffirmationModel
            }
        })
        res.status(200).json({
            "id": foundUser.id,
            "roleId": foundUser.roleId,
            "fName": foundUser.fName,
            "lName": foundUser.lName,
            "userCollectionInfo": foundUser.userCollections,
        })
    } catch(err) {
        res.status(500).json({message: "User could not be found"})
    }
});

router.post('/register', async (req, res) => {
    const {email, password, fName, lName} = req.body;
    try {
        console.log("Trying starts");
        const newUser = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 10),
            fName,
            lName,
            roleId: process.env.USER_ROLE
        });
        console.log("newUser finished");
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        console.log("token finished");
        res.status(201).json({
            message: "User registered",
            user: newUser,
            token
        })
    } catch (err) {
        console.log("Catching Errors")
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                message: "Failed to register user.",
                error: err,
            })
        }
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const loginUser = await UserModel.findOne({
            where: {email}
        })

        if (loginUser) {
            const passwordComparison = await bcrypt.compare(password, loginUser.password)

            if (passwordComparison) {
                const token = jwt.sign(
                    {id: loginUser.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 60 * 60 * 24})
                    
                res.status(200).json({
                    message: "Login successful",
                    user: loginUser,
                    token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch(err) {
        res.status(500).json({
            message: "Error logging in."
        })
    }
});

module.exports = router;