const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors
const userRoutes = require('./routes/users');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/www.bscs32a.com/user', userRoutes);
mongoose
  .connect(
    'mongodb+srv://macabatajhamesandrewrpdm:6IbkuKi63J4qTZji@cluster0.eeqai.mongodb.net/'
  )
  .then(() => console.log('Database Connected...'))
  .catch((err) => err.message);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
