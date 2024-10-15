const path = require('path')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
const userRouter = require('./routes/userRoute');
const storeRouter = require('./routes/storeRoute');
const productRouter = require('./routes/productRoute');
const deliveryRateRouter = require('./routes/deliveryRateRoute');

//////////////////////////////////////////////
//// MIDDLEWARES ////
//////////////////////////////////////////////

// MORGAN REQUEST MIDDLEWARE
app.use(morgan("dev"));

// EXPRESS BODY PARSER
app.use(express.json({ limit: "10mb" }));

// COOKIE PARSER
app.use(cookieParser());

// CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://web-app-getquick.vercel.app",
        "https://getquicka.com",
        "https://getquicka.shop"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


// ALLOWING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// REQUEST MIDDLEWARE
app.use(function (_, _, next) {
	console.log("Making Request..");
	next();
});


app.get('/', function(_, res) {
    const filePath = './tools/doc/api-doc.html';
    res.sendFile(filePath, { root: __dirname });
})


//////////////////////////////////////////////
//// MOUNTING ROUTES ////
//////////////////////////////////////////////
app.use('/api/users', userRouter);
app.use('/api/stores', storeRouter);
app.use('/api/products', productRouter);
app.use('/api/delivery-rates', deliveryRateRouter);


module.exports = app;