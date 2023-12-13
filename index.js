const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const { ensureAuthenticated } = require("./middleware/checkAuth");


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

// Routes start here
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
// app.get("/register", authController.register);
// app.get("/login", authController.login);
// app.post("/register", authController.registerSubmit);
// app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});


app.get(
  "/auth/login", (req, res) => {
    res.render("auth/login")
  }
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

app.get("/", (req, res) => {
  res.send("welcome")
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
 /*  if (req.user.admin == 1) {
    res.render("dashboard", {
      user: req.user
    })
  }
  else */ 
  console.log('found \n\n');
  console.log(req.user);
  console.log('found \n\n');
  res.redirect("/reminders") // need to redirect to reminders page
});

app.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    res.redirect("/auth/login");
  });
});