require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors'); // enable all cors requests
const cookieParser = require('cookie-parser'); // allows to use cookies
const connection = require('./config/database');

// DB connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`✨Server running on port ${port}`);
});
