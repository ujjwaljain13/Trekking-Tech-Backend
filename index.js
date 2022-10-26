const express = require("express");
const client = require("./db");
const auth = require("./auth");
const events1 = require("./events1");
const cors = require("cors");
const app = express();
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static("../frontend"));
// const corsOptions = {
//   origin: ['http://localhost:5000'],
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
// };
// http://127.0.0.1:5500/
app.use(
  cors()
    // origin: "http://127.0.0.1:5500",
  
);
app.get("/", (req, res) => {
  res.status(200);
});
app.use("/api/auth", auth);
app.use("/api/events", events1);
// app.use("/api/events1", events1);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
