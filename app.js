require('dotenv').config();
const express = require('express');
const cors = require('cors');

let app = express();

//Use Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

//Router
let routes = require('./routes/index');

//Use Routes
app.use('/todo', routes.taskRoutes);

module.exports = app;
