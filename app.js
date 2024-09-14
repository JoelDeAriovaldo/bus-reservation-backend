require('dotenv').config(); // Adicionado para carregar as variáveis de ambiente

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api'); // Rotas da API

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rotas
app.use('/api', apiRoutes);

// Testar a conexão com o banco de dados e sincronizar os modelos
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        // Sincronizar os modelos com o banco de dados
        return sequelize.sync();
    })
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro interno do servidor:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});