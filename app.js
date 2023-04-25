const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

mailchimp.setConfig({
    "apiKey": process.env.apiKey,
    "server": process.env.server
})

app.get("/", (_, res) => {
    console.log("Server is running on port 3000.")
    res.sendFile(`${__dirname}/signup.html`)
})

app.post("/", (req, res) => {
    mailchimp.lists.batchListMembers(process.env.listId, {
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.name,
                LNAME: req.body.lastName
            }
        }]
    }).then(() => {
        res.sendFile(`${__dirname}/success.html`)
    }).catch(() => {
        res.sendFile(`${__dirname}/failure.html`)
    }
    )
})


app.get("/success", (_, res) => {
    res.sendFile(`${__dirname}/success.html`)
    setTimeout(() => {
        res.redirect("/")
    }, 3000)
})

app.listen(3000)
