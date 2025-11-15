const { response } = require('express');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');

const getEventos = async (req, res = response) => {
    const eventos = await Evento.findAll({
        include: [{
            model: Usuario,
            attributes: ['name']
        }]
    });

    res.status(200).json({
        ok: true,
        eventos
    });
};

const crearEvento = async (req, res = response) => {
    try {
        const evento = await Evento.create({
            ...req.body,
            userId: req.uid
        });

        res.json({
            ok: true,
            evento
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
};

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findByPk(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (evento.userId !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const [ numeroDeFilasAfectadas, [eventoActualizado] ] = await Evento.update(
            { ...req.body, userId: uid },
            { where: { id: eventoId }, returning: true }
        );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findByPk(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (evento.userId !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.destroy({ where: { id: eventoId } });

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};
