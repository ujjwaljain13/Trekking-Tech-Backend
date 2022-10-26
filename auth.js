const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("./middleware/fetchuser");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const client = require("./db");
// const router = express.router();
const JWT_SECRET = "adityaisagoodboy";

app.post(
  "/signup",
  [
    body("username", "user name must be atleast 3 character").isLength({
      min: 3,
    }),
    body("email", "Enter A valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req).errors;
    if (errors.length != 0) {
      return res.status(400).json({ errors: errors, value: -2 });
    }
    try {
      const { username, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      const exist2 = await client.query(
        `select *from users where username = '${username}' ;`
      );
      if (exist2.rows.length != 0) {
        return res.status(500).json({ value: -3 });
      }
      const exist1 = await client.query(
        `SELECT * FROM users where email='${email}' ;`
      );
      if (exist1.rows.length != 0) {
        return res.status(500).json({ value: -4 });
      }

      await client.query(
        `insert into users values ('${username}' , '${email}' , '${secPass}'  , '{}' );`
      );
      const data1 = username;
      const authtoken = jwt.sign(data1, JWT_SECRET);
      res.json({ authtoken: authtoken, value: 0 });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "server error occured", value: -1 });
    }
  }
);

// Endpoint for login get request ROUTE 2
app.post(
  "/login",
  [
    body("username", "Enter A username").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req).errors;
    if (errors.length != 0) {
      return res.status(400).json({ value: -2, errors: errors });
    }
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const data = await client.query(
        `SELECT * FROM users where username='${username}';`
      );
      console.log(data.rows[0]);
      if (data.rowCount === 0) {
        return res
          .status(500)
          .json({ message: "Enter Right credentials ", value: -2 });
      }
      const passwordCompare = await bcrypt.compare(
        password,
        data.rows[0].password
      );
      if (!passwordCompare) {
        return res
          .status(500)
          .json({ message: "Enter Right credentials ", value: -2 });
      }
      const data1 = username;
      const authtoken = await jwt.sign(data1, JWT_SECRET);
      console.log("you logged in ...");
      res.status(200).json({ authtoken: authtoken, value: 0 });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ value: -1 });
    }
  }
);

app.get("/alldata", fetchuser, async (req, res) => {
  try {
    const username = req.user_name;
    const data = await client.query(
      `select *from users where username = '${username}' ;`
    );
    console.log(username);
    res.status(200).json({ value: 0, user: data.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(200).json({ value: -1, message: "server error" });
  }
});

app.post("/eventdata", async (req, res) => {
  try {
    const { eve_name } = req.body;
    // console.log(eve_name);
    const data = await client.query(
      `select * from allevents where eventname='${eve_name}' ;`
    );

    res.status(200).json({ value: 0, user: data.rows[0] });
    // console.log(data);

  } catch (error) {
    console.log(error);
    res.status(200).json({ value: -1, message: "server error" });
  }
});

module.exports = client;

// module.exports = router;
