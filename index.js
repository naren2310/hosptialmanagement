const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
const adminRoute = require('./routes/admin.route');
const doctorRoute = require('./routes/doctor.route');
const nurseRoute = require('./routes/nurse.route');
const patientRoute = require('./routes/patient.route');
const roomRoute = require('./routes/room.route');
const superAdminRourte = require('./routes/superAdmin.route');
const app = express();



//adding body parser
app.use(bodyparser.json());

// parse urlencoded request body
app.use(bodyparser.urlencoded({ extended: true }));

// Mongodb connection 
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection
if (!db) {
    console.log('db not connected');
} else { console.log('connected successs!..'); }

// simple route 
app.get('/', (req, res) => {
    res.send('Hello api')
});

app.use('/api',
    adminRoute,
    doctorRoute,
    nurseRoute,
    patientRoute,
    roomRoute,
    superAdminRourte)



// port show console page 
app.listen(process.env.PORT, () => {
    console.log(`Url : http://${process.env.IP}:${process.env.PORT}/`);
    // console.log(`server is running ${process.env.PORT}`);
})