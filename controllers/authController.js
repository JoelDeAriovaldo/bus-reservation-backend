const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ message: 'Usuário já existe.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, password: hashedPassword });
            return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
        } catch (err) {
            console.error('Error in register function:', err);
            return res.status(500).json({ message: 'Erro ao registrar usuário.', error: err.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Senha incorreta.' });
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.json({ message: 'Login bem-sucedido.', token });
        } catch (err) {
            console.error('Error in login function:', err); // Adicionado log detalhado
            return res.status(500).json({ message: 'Erro no login.', error: err.message });
        }
    }
};