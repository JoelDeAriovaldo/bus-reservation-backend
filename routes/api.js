const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const busController = require('../controllers/busController');
const seatController = require('../controllers/seatController');
const reservationController = require('../controllers/reservationController');
const paymentController = require('../controllers/paymentController');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const { Bus } = require('../models');

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas de busca de ônibus
router.post('/buses', authMiddleware, async (req, res) => {
    const { number, type, capacity, availableSeats, origin, destination, journeyDate, duration } = req.body;
    try {
        const newBus = await Bus.create({ number, type, capacity, availableSeats, origin, destination, journeyDate, duration });
        return res.status(201).json({ message: 'Ônibus inserido com sucesso!', bus: newBus });
    } catch (err) {
        console.error('Erro ao inserir ônibus:', err);
        return res.status(500).json({ message: 'Erro ao inserir ônibus.', error: err.message });
    }
});
router.get('/buses', authMiddleware, busController.searchBuses);
router.get('/buses/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const bus = await Bus.findByPk(id, {
            include: ['Seats']
        });
        if (!bus) {
            return res.status(404).json({ message: 'Ônibus não encontrado.' });
        }
        return res.json(bus);
    } catch (err) {
        console.error('Erro ao buscar ônibus:', err.stack);
        return res.status(500).json({ message: 'Erro ao buscar ônibus.', error: err.message });
    }
});

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