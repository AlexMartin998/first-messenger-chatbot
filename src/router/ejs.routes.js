import { Router } from 'express';
import { handleGetSurveyPage } from '../controllers/index.js';

const router = Router();

router.get('/', (_req, res) => {
  return res.render('homepage.ejs');
});

router.get('/get-survey', handleGetSurveyPage);

export default router;
