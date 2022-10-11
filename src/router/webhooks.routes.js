import { Router } from 'express';
import { getWebhook, postWebhook } from '../controllers/index.js';

const router = Router();

router.route('/').get(getWebhook).post(postWebhook);

export default router;
