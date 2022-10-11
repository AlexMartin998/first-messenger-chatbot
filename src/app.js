import express from 'express';

// import './db/db.js';
import { setupMiddlewares } from './middlewares/index.js';
import { webhookRouter } from './router/index.js';

// Initializations:
const app = express();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/webhook', webhookRouter);

export default app;
