const router = require("express").Router();
const jwt = require('../utils/jwt')

const UserModel = require('../models/user');
const AppError = require("../utils/app_error");
const loginHandler = async(req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await UserModel.findOne({username: username})
        if(!await user.isPasswordCorrect(password)) throw new AppError('incorrect credentials', 401)
        const token = await jwt.createToken({id: user.id}, process.env.SECRET)
        res.json({user, token})
    }catch(e){
        next(e)
    }
};
router.post("/login", loginHandler);

module.exports = router;
