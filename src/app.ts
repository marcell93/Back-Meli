import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as expressValidator from 'express-validator';
import * as cors from 'cors';
import { ProductRouter } from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env' || '.env.example'});

// Create Express server
const app = express();

// Express configuration
app.set('port', 3100);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'SESSION_SECRET',
}));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(cors());

app.use('/api/items', ProductRouter);

app.use((req: express.Request, resp: express.Response) => {
  resp.status(404).send({
    msg: 'Not Found!'
  });
});

module.exports = app;