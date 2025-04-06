const express = require("express");
const app = express();
const port = 3030;
const {getGuests, addGuest, removeGuest} = require("./database.js")
const EventEmitter = require("node:events")
class MyEmitter extends EventEmitter{}
const myEmitter = new MyEmitter()


app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

let clients = []

app.get("/", (req, res) => {
    res.sendFile("/public/index.html");
})

app.get("/list-guests", async (req, res) => {
    let guests = await getGuests()
    myEmitter.emit("newguest")
    res.json(guests)
})

// app.get("/guest-updates", async (req, res) => {
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Connection', 'keep-alive');
//     res.flushHeaders()
//     const clientId = Date.now()
//     const newClient = {
//         id: clientId,
//         response: res
//     }
//     clients.push(newClient)

//     // If client closes connection, stop sending events
//     res.on('close', () => {
//         console.log('client dropped me');
//         clients.filter(client => client.id != clientId)
//         res.end();
//     });
// })

app.post("/delete-guest", async(req, res) => {
    let result = await removeGuest(req.body.id)
    res.json(result)
})

app.post("/add-guest", async(req, res) => {
    await addGuest(req.body.name)
    let guestList = await getGuests() 
    // sendEventsToAll(req.body.name)
    res.json(guestList)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🌈`)
})

// function sendEventsToAll(newGuest) {
//     clients.forEach(client => client.response.write("here is a new guest"))
// }