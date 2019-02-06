// Loading environmental variables here
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db"); // loads our connection to the mongo database
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 3001;

const bcrypt = require("bcrypt-nodejs");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("./db/models/user");
const sgTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const MY_PASSWORD = process.env.MY_PASSWORD;

// ===== Middleware ====
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ===== testing middleware =====
app.use(function(req, res, next) {
  console.log("===== passport user =======");
  console.log(req.session);
  console.log(req.user);
  console.log("===== END =======");
  next();
});
// testing
app.get(
  "/auth/google/callback",
  (req, res, next) => {
    console.log(`req.user: ${req.user}`);
    console.log("======= /auth/google/callback was called! =====");
    next();
  },
  passport.authenticate("google", {
    successRedirect: "https://crossbreed-backend.herokuapp.com",
    failureRedirect: "https://crossbreed-backend.herokuapp.com/login"
  })
);

//password reset
app.post("/forgot", function(req, res, next) {
  console.log("testing forgot route " + JSON.stringify(req.body));
  const object1 = req.body;
  const email = Object.keys(object1);

  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ "local.email": email }, function(err, user) {
          console.log("before blue mountain " + user);
          if (err) return res.json("blue mountain" + err);

          user.local.resetPasswordToken = token;
          user.local.resetPasswordExpires = Date.now() + 900000; // 1 hour 3600000// 15 mins

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "kimiboo55@gmail.com",
            pass: MY_PASSWORD
          }
        });

        var mailOptions = {
          to: user.local.email,
          from: "kimiboo55@gmail.com",
          subject: "Your crossbreed account user password reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "https://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
      }
    ],
    function(err) {
      if (err) return err;
    }
  );
});

// user reset link

app.get("/reset/:token", function(req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function(err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("reset", {
        user: req.user
      });
    }
  );
});


app.post("/reset/:token", function(req, res) {
	console.log("testing reset password route" + JSON.stringify(req.body));
	const object1 = req.body;
	const password = Object.keys(object1);
	
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            "local.resetPasswordToken": req.params.token,
            "local.resetPasswordExpires": { $gt: Date.now() }
          },
          function(err, user) {
						if (err) return res.json("purple mountain" + err);

            user.local.password = req.body.password;
            user.local.resetPasswordToken = undefined;
            user.local.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          }
        );
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport("SMTP", {
          service: "SendGrid",
          auth: {
            user: "kimiboo55@gmail.com",
            pass: MY_PASSWORD
          }
        });
        var mailOptions = {
          to: user.local.email,
          from: "kimiboo55@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
      }
    ],
    function(err) {
      if (err) return err;
    }
  );
});

/* Express app ROUTING */
const routes = require("./routes");
app.use(routes);

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

// const mailOptions = {
// 	from: 'sender@email.com', // sender address
// 	to: 'to@email.com', // list of receivers
// 	subject: 'Subject of your email', // Subject line
// 	html: '<p>Your html here</p>'// plain text body
//   };
