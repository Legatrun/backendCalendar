const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Usuario = require('./Usuario');

const Evento = sequelize.define('Evento', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Usuario.hasMany(Evento, { foreignKey: 'userId' });
Evento.belongsTo(Usuario, { foreignKey: 'userId' });

module.exports = Evento;
