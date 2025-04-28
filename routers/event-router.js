const express = require('express')
const eventRouter = express.Router();
const eventEmitter = require("../event-emitter");

eventRouter.get("/new-guest-event", (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    res.write("connected to event server\n\n")    
    console.log("i'm listening ...")
    eventEmitter.on("newguest", function(guestList) {
        console.log("new guest added");
        res.write(`data: ${JSON.stringify({guestList})}\n\n`)
    })


    req.on('close', () => {
        console.log("client closed connection")
        res.end();
    });
})

module.exports = eventRouter;