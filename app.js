const express = require("express");
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const apiRouter = require("./routers/api-router")
const eventRouter = require("./routers/event-router")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter)
app.use("/events", eventRouter);

app.get("/[A-Za-z]+", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🌈`)
})