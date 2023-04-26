const express = require('express');
const app = express();
const signup = require('./routes/signup.js');
const failure = require('./routes/failure.js');
const success = require('./routes/success.js');
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/signup", signup);
app.use("/failure", failure);
app.use("/success", success);

app.get("*", (_, res) => {
    res.redirect("/signup")
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;
