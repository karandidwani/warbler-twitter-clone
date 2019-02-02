var db = require('../models');
var jwt = require('jsonwebtoken');

exports.signup = async function (req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let {id, email, username, profileImageUrl} = user;
        let token = jwt.sign({
            id,
            email,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry! that username and/or email is taken"
        }

        next({
            status: 400,
            message: err.message
        });
    }
}


exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({email: req.body.email});
        if(!user){
            return next({
                status: 400,
                message: "Incorrect Username/Password! Please try again!"
            });
        }
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let {id, email, username, profileImageUrl} = user;
            var token = await jwt.sign({
                id,
                email,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                email,
                profileImageUrl,
                token
            });
        }else{
            return next({
                status: 400,
                message: "Incorrect Username/Password! Please try again!"
            });
        }
    }catch (err) {
        next({
            status: 400,
            message: err.message
        });
    }
}

