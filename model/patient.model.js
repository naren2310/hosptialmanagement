const mongoose = require('mongoose');
const { validatephoneno } = require('../cutsomValidation/regex.validation')

const patientSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'firstName is required'],
        minLength: [3, "firstname min length 3 characters"]
    },//firstName filed should be required 
    last_name: {
        type: String,
        required: [true, 'lastName is required'],
        minLength: [3, "lastname min length 3 characters"]
    },//lastName filed should be required 
    address: {
        type: String,
    },
    mobile_no: {
        type: Number,
        validate: [validatephoneno, 'mobileno atleast 10 digit'],
        required: true,
    },
    fever_type: {
        type: String,
        required: true,
        enum: ['fever', 'cold', 'headache', "other"]
    },
    admit_date: {
        type: Date,
        max: Date.now(),
        required: [true, 'please fill admit_date']
    },
    bill_no: {
        type: String,
        unique:true
    },
    gender: {
        type: String,
        required: [true,'please fill gender'],
        enum: ['male', 'female', 'other']
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    nurse_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nurse'
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: "nurse"
    }
}, { timestamps: true })

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient
