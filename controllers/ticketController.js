const { Reservation, Bus, Seat } = require('../models');

module.exports = {
    viewTickets: async (req, res) => {
        const { userId } = req.params;
        try {
            const reservations = await Reservation.findAll({
                where: { userId, status: 'confirmed' },
                include: [Bus, Seat]
            });
            return res.json(reservations);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar bilhetes.', error: err });
        }
    }
};
