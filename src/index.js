const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./database");

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      password: req.body.password,
    };

    await collection.insertMany([data]);

    res.render("home");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("Incorrect password");
    }
  } catch {
    res.send("Incorrect details");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});
