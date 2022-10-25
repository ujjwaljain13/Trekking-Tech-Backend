const { Client } = require("pg");
const client = new Client("postgres://weslkxke:7Udeo7VrnbTzCgWOStev8gRUBqppOQRL@arjuna.db.elephantsql.com/weslkxke");

module.exports = client;
