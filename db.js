require('dotenv').config();
const { Client } = require("pg");
const client = new Client(process.env.DB_SECRET);

module.exports = client;
