const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

mailchimp.setConfig({
    "apiKey": process.env.apiKey,
    "server": process.env.server
})
const listId = process.env.listId

app.get("/api", (_, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    res.sendFile('index.html', { root: __dirname })
})

app.post("/api", (req, res) => {
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
        res.sendFile('success.html', { root: __dirname })
    }).catch(() => {
        res.sendFile('failure.html', { root: __dirname })
    }
    )
})

app.post("/api/failure", (_, res) => {
    res.redirect("/api")
})

app.post("/api/success", (_, res) => {
    res.redirect("/api")
})

app.listen(3000)
