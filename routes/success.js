const express = require('express');
const path = require('path');
const router = express.Router();

router.post("/", (_, res) => {
    res.redirect("/signup")
})

router.get("/", (_, res) => {
    res.sendFile("success.html", { root: "../" })
})

module.exports = router;
