const { Client } = require("pg");
const client = new Client("postgres://ewqwnkze:4TEPuU0UqsE76NRFDxhc4zgew_U3G8Te@arjuna.db.elephantsql.com/ewqwnkze");

module.exports = client;
