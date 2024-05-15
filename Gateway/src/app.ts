import express, {Application} from "express";
import morgan from "morgan";

import dotenv from 'dotenv';
import {Signale} from "signale";
import proxy from "express-http-proxy";

const app:Application = express();
const signale = new Signale();

dotenv.config();

app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;
const GATEWAY = process.env.SERVICE_NAME;

app.use('/api/v1/orders',proxy('http://localhost:3002'));
app.use('/api/v1/inventory',proxy('http://localhost:3001'));


app.listen(PORT, () => {
    signale.success(`Servicio ${GATEWAY} corriendo en http://localhost:${PORT}`);
});