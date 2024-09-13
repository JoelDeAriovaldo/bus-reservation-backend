module.exports = {
    development: {
        username: process.env.DB_USER || 'bus_user',
        password: process.env.DB_PASSWORD || 'password123',
        database: process.env.DB_NAME || 'bus_reservation_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USER || 'bus_user',
        password: process.env.DB_PASSWORD || 'password123',
        database: process.env.DB_NAME || 'bus_reservation_test_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
};
