

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './src/routes/user-routes.js';
import Captainroute from './src/routes/captain-routes.js';
import maproutes from './src/routes/maps-routes.js';
import rideRoute from './src/routes/ride-routes.js';

dotenv.config({
  path: './.env',
});

const app = express();

// ✅ Allow requests from all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/user', routes);
app.use('/captain', Captainroute);
app.use('/maps', maproutes);
app.use('/ride', rideRoute);

export { app };
