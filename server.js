const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const routes = require("./routes/api")(app);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/crossbreed";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});