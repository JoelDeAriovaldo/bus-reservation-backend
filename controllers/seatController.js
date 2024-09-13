const { Seat, Reservation } = require('../models');

module.exports = {
    checkSeatAvailability: async (req, res) => {
        const { busId } = req.params;
        try {
            const seats = await Seat.findAll({ where: { busId } });
            return res.json(seats);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar assentos.', error: err });
        }
    },

    reserveSeat: async (req, res) => {
        const { seatId, userId, busId, boardingPoint, dropOffPoint, journeyDate } = req.body;
        try {
            const seat = await Seat.findOne({ where: { id: seatId, busId, status: 'available' } });
            if (!seat) {
                return res.status(400).json({ message: 'Assento não disponível.' });
            }

            await seat.update({ status: 'reserved' });
            const reservation = await Reservation.create({
                userId,
                busId,
                seatId,
                boardingPoint,
                dropOffPoint,
                journeyDate
            });

            return res.json({ message: 'Assento reservado com sucesso.', reservation });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao reservar assento.', error: err });
        }
    }
};
