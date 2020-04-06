const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
const connection = require('./database/connection');
const routes = express.Router();
const managerController = require('./controllers/managerController');
const consultController = require('./controllers/consultController');
const sessionController = require('./controllers/sessionController');
const concludeConsultController = require('./controllers/concludeConsultController');
const profileIndexTodayController = require('./controllers/profileIndexTodayController');
const profileIndexConclude = require('./controllers/profileIndexConcludeController');
const profileIndexUpdateController = require('./controllers/profileIndexUpdateController');
const profileIndexNoConclude = require('./controllers/profileIndexNoConclude');

routes.post('/manager', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        passLast: Joi.string().required(),
        registration: Joi.string().required().min(6),
        office: Joi.string().required(),
    }),
}), managerController.create);

routes.get('/manager', managerController.index);

routes.post('/consult', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        owner: Joi.string().required(),
        species: Joi.string().required(),
        breed: Joi.string().required(),
        phone: Joi.string().required().min(10).max(11),
        email: Joi.string().required().email(),
    }),
}), consultController.create);

routes.get('/consult', consultController.index);

routes.delete('/consult/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    }),
}), consultController.delete);

routes.put('/consult/update/:id', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        owner: Joi.string().required(),
        species: Joi.string().required(),
        breed: Joi.string().required(),
        phone: Joi.string().required().min(10).max(11),
        email: Joi.string().required().email(),
    }),
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    }),
}), consultController.update);

routes.put('/consult/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    }),
}), concludeConsultController.conclude);

routes.get('/consult/profile/today', profileIndexTodayController.indexToday);

routes.get('/consult/profile/conclude', profileIndexConclude.indexConclude);

routes.get('/consult/profile/no/conclude', profileIndexNoConclude.indexNoConclude);

routes.get('/consult/profile/list/update/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    }),
}), profileIndexUpdateController.indexUpdate);

routes.post('/sessions', celebrate({
    [Segments.BODY] : Joi.object().keys({
        email: Joi.string().required().email(),
        passLast: Joi.string().required(),
    }),
}), sessionController.create);

module.exports = routes;