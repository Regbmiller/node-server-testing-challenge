const express = require("express");
const server = express();
const carsRouter = require('./cars/')

server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({ api: "Working" });
  });
server.use('/api/cars', carsRouter)
server.initialize(carsRouter);

module.exports = server;