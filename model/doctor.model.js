const mongoose = require('mongoose');
const { validateEmail, validatepassword} = require('../cutsomValidation/regex.validation');
const doctorSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'firstName is required'],
        minLength: [3, "firstname min length 3 characters"],
    },//firstName filed should be required 
    last_name: {
        type: String,
        required: [true, 'lastName is required'],
        minLength: [3, "lastname min length 3 characters"],
        // validate:[validname,'valid lastname'],
    },//lastName filed should be required 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, 'email is required'],
    },// email filed should be required 
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, "password min length 8 characters"],
        // validate: [validatepassword, 'Please fill a valid password'],
    },//password filed should be required
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true,'please fill gender'],
    },
    d_o_b: {
        type: Date,
        max: Date.now(),
        required: [true, 'please fill dob']
    },
    nurse_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nurse'
    }],
    d_o_j: {
        type: Date,
        max: Date.now(),
        required: [true, 'please fill d_o_j']
    },
    room_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
    }],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: "superAdmin",
    },
}, { timestamps: true })

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor
