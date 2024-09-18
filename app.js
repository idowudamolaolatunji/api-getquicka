const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

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


//////////////////////////////////////////////
//// MOUNTING ROUTES ////
//////////////////////////////////////////////




export default app;