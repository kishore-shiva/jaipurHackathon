const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[INFO] Server started on PORT ${PORT}`));
