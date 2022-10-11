import express from 'express';
import * as homepageController from './../controllers/homepageController.js';

let router = express.Router();

//init all web routes
export const initWebRoutes = app => {
  router.get('/', homepageController.getHomepage);
  router.get('/webhook', homepageController.getWebhook);
  router.post('/webhook', homepageController.postWebhook);

  return app.use('/', router);
};
