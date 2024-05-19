import express from 'express';
import { Signale } from 'signale';
import { setupOrderEndpoints } from './infrastructure/endpoints/OrderEndpoints';


const app = express();
const signale = new Signale();

app.use(express.json())
app.use(setupOrderEndpoints)

app.listen(3002, () => {
    signale.success("Server on line in port: 3002")
})