require('dotenv').config();
const express = require("express");
const client = require("./db");
const auth = require("./auth");
const events1 = require("./events1");
const cors = require("cors");
const server = express();
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const port = process.env.PORT || 5000;
server.use(express.json());
server.use(express.static("../frontend"));
// const corsOptions = {
//   origin: ['http://localhost:5000'],
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
// };
// http://127.0.0.1:5500/
server.use(
  cors()
    // origin: "http://127.0.0.1:5500",
  
);
server.get("/", (req, res) => {
  res.status(200).json({
    message : "ok"
  });

});
server.use("/api/auth", auth);
server.use("/api/events", events1);
// app.use("/api/events1", events1);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
