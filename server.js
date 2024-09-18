const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 3550

//////////////////////////////////////////////
//// DATABASE CONNECTION ////
//////////////////////////////////////////////
const DBSTRING = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

async function connectDB() {
    try {
        const con = await mongoose.connect(DBSTRING);
        console.log(con);
        console.log('Database connected successfully!');

    } catch(err) {
        console.log(err.message);
    }
}
connectDB();


//////////////////////////////////////////////
//// SERVER CONFIGURATION ////
//////////////////////////////////////////////
app.listen(PORT, 'localhost', function() {
    console.log(`Server is listening on port ${PORT}...`);
});