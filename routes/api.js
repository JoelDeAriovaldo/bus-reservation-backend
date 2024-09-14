const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const busController = require('../controllers/busController');
const seatController = require('../controllers/seatController');
const reservationController = require('../controllers/reservationController');
const paymentController = require('../controllers/paymentController');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas de busca de ônibus
router.get('/buses', authMiddleware, busController.searchBuses);

// Rotas de assentos
router.get('/buses/:busId/seats', authMiddleware, seatController.checkSeatAvailability);
router.post('/reserve-seat', authMiddleware, seatController.reserveSeat);

// Rotas de reservas
router.get('/reservations/:userId', authMiddleware, reservationController.getReservations);
router.put('/reservations/:reservationId/confirm', authMiddleware, reservationController.confirmReservation);

// Rotas de pagamentos
router.post('/payments', authMiddleware, paymentController.processPayment);

// Rotas de bilhetes
router.get('/tickets/:userId', authMiddleware, ticketController.viewTickets);

module.exports = router;