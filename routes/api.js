const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const busController = require('../controllers/busController');
const seatController = require('../controllers/seatController');
const reservationController = require('../controllers/reservationController');
const paymentController = require('../controllers/paymentController');
const ticketController = require('../controllers/ticketController');

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas de busca de ônibus
router.get('/buses', busController.searchBuses);

// Rotas de assentos
router.get('/buses/:busId/seats', seatController.checkSeatAvailability);
router.post('/reserve-seat', seatController.reserveSeat);

// Rotas de reservas
router.get('/reservations/:userId', reservationController.getReservations);
router.put('/reservations/:reservationId/confirm', reservationController.confirmReservation);

// Rotas de pagamentos
router.post('/payments', paymentController.processPayment);

// Rotas de bilhetes
router.get('/tickets/:userId', ticketController.viewTickets);

module.exports = router;
