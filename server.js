const express = require('express');
const { rmSync } = require('fs');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

// PORT is declared in environment OR 3001
const PORT = process.env.PORT || 3001;

// app
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Load API routes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });