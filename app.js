const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

mailchimp.setConfig({
    "apiKey": "",
    "server": ""
})

const LISTID = "";

app.get("/", (_, res) => {
    console.log("Server is running on port 3000.")
    res.sendFile(`${__dirname}/signup.html`)
})

app.post("/", (req, res) => {
    const name = req.body.name
    const lastName = req.body.lastName
    const email = req.body.email
    mailchimp.lists.batchListMembers(LISTID, {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name,
                LNAME: lastName
            }
        }]
    }).then(() => {
        res.sendFile(`${__dirname}/success.html`)
    }).catch(() => {
        res.sendFile(`${__dirname}/failure.html`)
    }
    )
})

app.post("/failure", (_, res) => {
    res.redirect("/")
})

app.listen(3000)
