import express from 'express';
import { handleSetupInfor } from './controllers/index.js';

// import './db/db.js';
import { setupMiddlewares } from './middlewares/index.js';
import { ejsRouter, webhookRouter } from './router/index.js';

// Initializations:
const app = express();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/', ejsRouter);

app.use('/webhook', webhookRouter);

app.use('/setup', handleSetupInfor);

export default app;
