const { Bus } = require('../models');

module.exports = {
    searchBuses: async (req, res) => {
        const { origin, destination, journeyDate } = req.query;
        try {
            console.log('Search parameters:', { origin, destination, journeyDate });
            const buses = await Bus.findAll({
                where: { origin, destination, journeyDate },
                include: ['Seats']
            });
            console.log('Buses found:', buses);
            return res.json(buses);
        } catch (err) {
            console.error('Erro ao buscar ônibus:', err.stack); // Log completo do erro
            return res.status(500).json({ message: 'Erro ao buscar ônibus.', error: err.message });
        }
    }

};