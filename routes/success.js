const express = require('express');
const router = express.Router();

router.post("/", (_, res) => {
    res.redirect("/signup")
})

router.get("/", (_, res) => {
    res.sendFile("public/success.html", { root: __dirname })
})

module.exports = router;
