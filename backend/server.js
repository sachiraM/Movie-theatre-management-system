require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//import routes
const supplierRouter = require("./routes/supplier.js");
const stockRouter = require("./routes/stock.js");
const customerRoutes = require("./routes/customer.js");
const loyaltyRoute = require("./routes/loyalitydb.js");
const productRouter = require("./routes/product.js");
const Prd = require("./routes/Prd.js");
const PaymentRoutes = require("./routes/paymentRoutes.js");

const Movie_routes = require('./routes/MovieRoutes.js');
const bookingRouter = require('./routes/bookings.js');
const AdminRoutes = require("./routes/movieSchedulesRoutes.js");
const privateScreenRoutes = require('./routes/privatescreens.js');
const privateScBookingRoutes = require('./routes/privateScBookings.js');
const advertisementRoutes = require("./routes/advertisementRoute");
const screenRoutes = require("./routes/screenRoute");

const app = express();
const PORT = 3013;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB connection string from .env
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

//Routes
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/screens", screenRoutes);
app.use("/admin", AdminRoutes); 
app.use("/customer",customerRoutes);
app.use("/loyality", loyaltyRoute);
app.use('/prd', Prd);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/stock", stockRouter);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/screens", screenRoutes);
app.use('/movie', Movie_routes);
app.use('/booking', bookingRouter);
app.use("/supplier", supplierRouter);
app.use("/stock", stockRouter); 
app.use("/product", productRouter);
app.use("/privatescreen", privateScreenRoutes);
app.use('/private-screens', privateScBookingRoutes);
app.use("/payment", PaymentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});