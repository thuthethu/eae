const express = require('express');

const SessionController = require('./controllers/SessionController');

const ongController = require('./controllers/OngController')

const ProfileController = require('./controllers/ProfileController');

const IncidentController = require('./controllers/IncidentController')


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create);

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;