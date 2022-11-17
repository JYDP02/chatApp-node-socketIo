var express = require("express");
const mongoose = require("mongoose");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

const Message = mongoose.model("Message", {
    name: String,
    message: String
})

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.get("/messages/:user", (req, res) => {
    var user = req.params.user;
    Message.find({name: user}, (err, messages) => {
        res.send(messages);
    })
})


app.post("/messages", async (req, res) => {
    var message = new Message(req.body);

    await message.save();

    console.log("saved");
    console.log(req.ip);

    var censored = await Message.findOne({ message: "badword" })

    if (censored)
        await Message.deleteOne({ _id: censored.id })
    else
        io.emit("message", req.body)

    res.sendStatus(200);
})

io.on("connection", (socket) => {
    console.log("a New User Connected");
})

mongoose.connect("<Mpngo URI>", (err) => {
    console.log("MongoDB connected Successfully", err);
})

console.log(process.argv);

http.listen(3000, (err) => {
    console.log("Server Listening", err);
})




//WE are not supposed to use .then and .catch if we are using async/await.
    // message.save()
    //     .then(() => {
    //         console.log("Saved");
    //         return Message.findOne({ message: "badword" })
    //     })
    //     .then(censored => {
    //         if (censored) {
    //             console.log("Censored owrd Found", censored);
    //             return Message.deleteOne({ _id: censored.id })
    //         }
    //         io.emit("message", req.body);
    //         res.sendStatus(200);
    //     })
    //     .catch((err) => {
    //         res.sendStatus(500);
    //         return console.error(err);
    //     })
