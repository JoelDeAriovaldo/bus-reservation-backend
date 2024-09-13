const { Reservation, Bus, Seat, User } = require('../models');

module.exports = {
    getReservations: async (req, res) => {
        const { userId } = req.params;
        try {
            const reservations = await Reservation.findAll({
                where: { userId },
                include: [Bus, Seat]
            });
            return res.json(reservations);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar reservas.', error: err });
        }
    },

    confirmReservation: async (req, res) => {
        const { reservationId } = req.params;
        try {
            const reservation = await Reservation.findByPk(reservationId);
            if (!reservation) {
                return res.status(404).json({ message: 'Reserva não encontrada.' });
            }

            // Confirme a reserva logicamente (exemplo: alterar o status)
            reservation.status = 'confirmed';
            await reservation.save();

            return res.json({ message: 'Reserva confirmada com sucesso.', reservation });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao confirmar reserva.', error: err });
        }
    }
};
