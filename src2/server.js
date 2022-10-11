import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { initWebRoutes } from './routes/web.js';
import { configViewEngine } from './config/viewEngine.js';

console.clear();

config();

let app = express();

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//config web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Messenger bot is running at the port ${port}`);
});
