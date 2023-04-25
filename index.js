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
    res.sendFile(`${__dirname}/index.html`)
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
        res.sendFile('success.html', { root: __dirname })
    }).catch(() => {
        res.sendFile('failure.html', { root: __dirname })
    }
    )
})

app.post("/failure", (_, res) => {
    res.redirect("/")
})

app.post("/success", (_, res) => {
    res.redirect("/")
})

app.listen(3000)
