const express = require('express')
const apiRouter = express.Router();
const {getGuests, addGuest, removeGuest} = require("../database.js")

apiRouter.get("/list-guests", async (req, res) => {
    let guests = await getGuests()
    res.json(guests)
})

apiRouter.post("/delete-guest", async(req, res) => {
    let result = await removeGuest(req.body.id)
    res.json(result)
})

apiRouter.post("/add-guest", async(req, res) => {
    await addGuest(req.body.name)
    let guestList = await getGuests() 
    res.json(guestList)
})

module.exports = apiRouter;