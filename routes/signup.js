const express = require('express');
const path = require('path');
const router = express.Router();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }))

mailchimp.setConfig({
    "apiKey": process.env.apiKey,
    "server": process.env.server
})

const listId = process.env.listId

router.post("/", (req, res) => {
    mailchimp.lists.batchListMembers(listId, {
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.name,
                LNAME: req.body.lastName
            }
        }]
    }).then(() => {
        res.sendFile("success.html", { root: path.join(__dirname, 'public') })
    }).catch(() => {
        res.sendFile("failure.html", { root: path.join(__dirname, 'public') })
    }
    )
})

router.get("/", (_, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    res.sendFile("public/signup.html", { root: path.join(__dirname, 'public') })
})

module.exports = router;
