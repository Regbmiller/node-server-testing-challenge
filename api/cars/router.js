const express = require("express");
const cars = require("./model");
const server = express();

server.use(express.json());

server.get("/cars", (req, res) => {
  cars.getAll()
    .then(cars => {
      res.status(200).json(cars);
   })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/cars", async (req, res) => {
    try {
        const newCar = await cars.insert(req.body)
        res.status(200).json(newCar);
    } catch (err) {
        res.status(500).json(err);
    }
});

server.delete("/cars/:id", async (req, res) => {
    const {id} = req.params
  try {
    const deletedCar = await cars.remove(id)
    res.status(200).json(deletedCar);
} catch (err) {
    res.status(500).json(err);
}
});



