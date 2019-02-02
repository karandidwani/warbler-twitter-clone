var mongoose = require('mongoose');
const User = require("./user");

var messageSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
    },
    {
        timestamps: true
    }
);

messageSchema.pre("remove", async function(next){
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    }catch (err) {
        next(err)
    }
})

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;