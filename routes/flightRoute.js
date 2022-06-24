const express = require('express');

const router = express.Router();
const flightController = require('../controllers/flightController');

router.post('/bookFlight', flightController.bookFlight);
router.get('/getFlights', flightController.getFlights);
router.get('/getFlight/:id', flightController.getFlight);
router.patch('/updateFlight/:id', flightController.updateFlight);
router.delete('/cancelFlight/:id', flightController.deleteFlight);

module.exports = router;
