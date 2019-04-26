const express = require('express');
const apiController = require('../src/controllers/apicontroller');

const apiRouter = new express.Router();

apiRouter.post('/', apiController.getPressure);

module.exports = apiRouter;