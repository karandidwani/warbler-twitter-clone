require('dotenv').config();
const express = require('express');
var app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
var errorHandler = require('./handlers/error');
var authRoutes = require('./routes/auth');
var messageRoutes = require('./routes/messages');
const {loginRequired, ensureCorrectUser} = require("./middleware/messages");
const db = require('./models')

var PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/message', loginRequired, ensureCorrectUser, messageRoutes);

app.use("/api/messages", loginRequired, async function (req, res, next) {
   try {
       messages = await db.Message.find()
           .sort({
               createdAt: "desc"
           })
           .populate("user", {
               username: true,
               profileImageUrl: true
           });
       return res.status(200).json(messages);
   }catch (err) {
        return next(err);
   }

})

app.use(function (req, res, next) {
    let err = new Error("Not Found!");
    err.status = 400;
    next(err)
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server started at port ${PORT}`);
});
