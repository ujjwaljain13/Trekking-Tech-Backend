const { query } = require("express");
const express = require("express");
const path = require("path");
// const session = require("express-session");
// const flash = require("connect-flash");
const app = express();
const port = 100;
const bcrypt = require("bcrypt");
const { Client } = require("pg");
const nodemon = require("nodemon");
const { write } = require("fs");
const { request } = require("http");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const jwt = require("jsonwebtoken");
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "root",
  database: "upsilon",
});

client.connect().then(() => console.log("Connected Successfully"));
const JWT_SECRET = "himanshugautam";
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/contact.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "/dashboard.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "/signup.html"));
});

app.get("/event-1", (req, res) => {
  res.sendFile(path.join(__dirname, "/event-1.html"));
});
app.get("/event-2", (req, res) => {
  res.sendFile(path.join(__dirname, "/event-2.html"));
});
app.get("/event-3", (req, res) => {
  res.sendFile(path.join(__dirname, "/event-3.html"));
});
app.get("/event-4", (req, res) => {
  res.sendFile(path.join(__dirname, "/event-4.html"));
});
app.get("/event-5", (req, res) => {
  res.sendFile(path.join(__dirname, "/event-5.html"));
});
app.get("/event-6", (req, res) => {
  res.sendFile(path.join(__dirname, "/event-6.html"));
});
// res.render("dashboard", { user: "hima" });
app.use(express.static("public"));

// client.query(`select * from users where username='admin'`, (err, result) => {
//   if (!err) {
//     console.log(result.rows);
//   }
// });

app.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  // console.log({
  //   username,
  //   email,
  //   password,
  // });
  if (!username || !email || !password) {
    // document.write("Please Enter All the Fields");
    res.sendFile(path.join(__dirname, "/signup.html"));
    // errors.push({ message: "Please Enter All the Fields" });
  } else if (Object.keys(password).length < 6) {
    // h3.textContent = "Password Should Be Atleast of 6 characters";
    // document.write("<h3>Password Should Be Atleast of 6 characters </h3>");
    res.sendFile(path.join(__dirname, "/signup.html"));
    // errors.push({ message: "Password  Should Be Atleast of 6 characters" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const a1 = 0;
    const a2 = {};
    let hashedpassword = await bcrypt.hash(password, salt);
    client.query(`INSERT INTO users values($1,$2,$3,$4,$5)`, [
      username,
      email,
      hashedpassword,
      a1,
      a2,
    ]);

    res.sendFile(path.join(__dirname, "/login.html"));
  }
});
// if (document.querySelector())
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  // client.query(
  //   `SELECT * FROM users WHERE username=$1`,
  //   [username],
  //   async (err, user) => {
  //     const u = user.rows[0];
  //     // console.log(u.username);
  //     if (!err) {
  //       // console.log(result.rows);
  //       if (await bcrypt.compare(password, u.password)) {
  //         res.sendFile(path.join(__dirname, "/dashboard.html"));
  //       } else {
  //         res.sendFile(path.join(__dirname, "/login.html"));
  //       }
  //     } else {
  //       res.sendFile(path.join(__dirname, "/login.html"));
  //     }
  //   }
  // );
  try {
    const data = await client.query(
      `select *from users where username='${username}'`
    );
    const password_to_compare = await bcrypt.compare(
      password,
      data.rows[0].password
    );
    if (!password_to_compare) {
    } else {
      const data1 = data.rows[0].username;
      const authtoken = jwt.sign(data1, JWT_SECRET);
      // localStorage.setItem("auth_token", authtoken);
      // const h1 = localStorage.getItem("auth_token");
      // console.log(h1);
      res.sendFile(path.join(__dirname, "/dashboard.html"));
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("SUCCESSFULLY RUNNING THE APP on port =", port);
});
