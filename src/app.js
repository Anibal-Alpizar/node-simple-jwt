import express from 'express'
import auth from './controllers/auth.controller.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // server understand data from form and convert it to javascript object

app.use('/', auth);

export default app;