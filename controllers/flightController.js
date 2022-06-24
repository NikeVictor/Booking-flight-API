const {Flight} = require("../models/flightModel");
const {v4: uuid} = require("uuid")

module.exports = {
    bookFlight: async (req, res) => {
      try {
        const {title, time, price, date} = await req.body;
        const newFlight = {
          id: uuid(),
          title,
          time,
          price,
          date
        }
        Flight.push(newFlight);
        res.json({
          message: "flight booked",
          data: newFlight
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
  },

  // Getting all flights
  getFlights: async (req, res, next) => {
    try {
      const flights = Flight;
      res.status(200).json({
        message: "All flights available",
      data: flights
      });
    } catch (error) {
      next(error)
      }
  },
  
  // Getting a particular flight
  getFlight: async (req, res, next) => {
      try {
        const id = req.params.id;
        const flight = Flight.find((flight) => flight.id === id);
        if (!flight) return next(new Error('flight does not exist'));
          res.status(200).json({
            message: "Flight found",
            data: flight
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
  }
  },

  // Updating a flight
  updateFlight: async (req, res, next) => {
      try {
        const update = req.body
        const id = req.params.id;
        const flight = Flight.find((flight) => flight.id === id, update);
        const {title, time, price, date} = await req.body;
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
          res.status(200).json({
            message: 'Flight has been updated',
            data: flight
          });
      } catch (error) {
          next(error)
      }
  },
   
  // Deleting a flight
  deleteFlight: async (req, res, next) => {
      try {
        const id = req.params.id;
        const flight = Flight.find((flight) => flight.id === id);
        Flight.splice(Flight.indexOf(flight), 1)
          res.status(200).json({
            message: 'Flight has been cancelled',
          });
      } catch (error) {
          next(error)
      }
  }
}

   