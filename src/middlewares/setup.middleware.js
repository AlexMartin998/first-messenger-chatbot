import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// const corsOptions = {
//   origin: function (origin, callbak) {
//     if (allowedDomains.includes(origin)) return callbak(null, true);
//     else return callbak(new Error(`${origin} has been blocked by CORS`));
//   },
// };

export const setupMiddlewares = app => {
  app.use(cors());
  // app.use(cors(corsOptions));
  app.use(express.json());

  app.use(express.static('./src/public'));
  app.set('view engine', 'ejs');
  app.set('views', './src/views');

  app.use(express.urlencoded({ extended: false }));
  app.use(compression()).use(helmet());
  app.use(morgan('dev'));

  // Other middlewares
};
