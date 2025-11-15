const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
);

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database online');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw new Error('Error al inicializar la base de datos');
    }
};

module.exports = {
    dbConnection,
    sequelize
};