const { Bus } = require('../models');

module.exports = {
    searchBuses: async (req, res) => {
        const { journeyDate } = req.query;
        try {
            const buses = await Bus.findAll({
                where: { journeyDate },
                include: ['Seats']
            });
            return res.json(buses);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar ônibus.', error: err });
        }
    }
};
