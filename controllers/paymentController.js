const { Payment, Reservation } = require('../models');

module.exports = {
    processPayment: async (req, res) => {
        const { reservationId, amount, paymentMethod, transactionId } = req.body;
        try {
            const reservation = await Reservation.findByPk(reservationId);
            if (!reservation) {
                return res.status(404).json({ message: 'Reserva não encontrada.' });
            }

            const payment = await Payment.create({
                reservationId,
                amount,
                paymentMethod,
                transactionId,
                status: 'paid'
            });

            return res.json({ message: 'Pagamento realizado com sucesso.', payment });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao processar pagamento.', error: err });
        }
    }
};
