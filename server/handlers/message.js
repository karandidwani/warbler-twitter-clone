var db = require('../models')

exports.createMessage = async function (req, res, next) {
    try {
        let userId = req.params.id;
        let message = await db.Message.create({
            text: req.body.text,
            user: userId
        });
        let foundUser = await db.User.findById(userId);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage)
    } catch (err) {
        return next(err);
    }
}

exports.getMessage = async function (req, res, next) {
    try {
        message_id = req.params.message_id;
        message = await db.Message.findById(message_id).populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(message)
    } catch (err) {
        next(err);
    }
}

exports.deleteMessage = async function (req, res, next) {
    try {
        const message_id = req.params.message_id
        var message = await db.Message.findById(message_id);
        await message.remove();
        return res.status(200).json(message)
    } catch (err) {
        next(err);
    }
}