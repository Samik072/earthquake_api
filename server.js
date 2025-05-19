const express = require('express');
const rateLimit = require('express-rate-limit');
const earthquakeRoutes = require('./routes/earthquakeRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Rate Limiter

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 request per windowMs
    message: 'Too many request, please try again later.',
})

app.use(limiter);
app.use(express.json());
app.use('/earthquakes', earthquakeRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    
})