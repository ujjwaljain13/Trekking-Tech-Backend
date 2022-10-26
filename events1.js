const express = require("express");
const fetchuser = require("./middleware/fetchuser");
const router  = express.Router();
const client = require("./db");

router.post("/enrolled", fetchuser, async (req, res) => {
  try {
    const username = req.user_name;
    const { event_name } = req.body;
    console.log(event_name);
    const data = await client.query(
      `select *from users where username = '${username}' ;`
    );
    // console.log(data);
    const enrolled_events = data.rows[0].events;
    if (enrolled_events.includes(event_name)) {
      return res
        .status(200)
        .json({ message: "you are already registered", value: -2 });
    }

    let data1 = await client.query(
      `update users set events = events || '{${event_name}}'   where username = '${username}' ;`
    );

    res.status(200).json({ value: 0 });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "can't enrolled", value: -1 });
  }
});

router.post("/revoke", fetchuser, async (req, res) => {
  try {
    const username = req.user_name;
    const { event_name } = req.body;
    console.log(event_name);
    const data = await client.query(
      `select *from users where username = '${username}' ;`
    );
    // console.log(data);
    const enrolled_events = data.events;
    let data1;

    data1 = await client.query(
      `update users set events = array_remove( events , '${event_name}') where username = '${username}' ;`
    );

    res.status(200).json({ value: 0 });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "can't enrolled", value: -1 });
  }
});

module.exports = client;

module.exports = router;
