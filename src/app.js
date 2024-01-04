import express from 'express'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // server understand data from form and convert it to javascript object

export default app;