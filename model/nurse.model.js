const mongoose = require('mongoose');
const { validateEmail, validatepassword } = require('../cutsomValidation/regex.validation');

const nurseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [3, "name min length 3 characters"],
    },//name filed should be required 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, 'email is required'],
    },// email filed should be required 
    password: {
        type: String,
        required: [true, 'please fill password'],
        minLength: [8, "password min length 8 characters"],
    },//password filed should be required
    d_o_b: {
        type: Date,
        max: Date.now(),
        required: [true, 'please fill d_o_b']
    },
    d_o_j: {
        type: Date,
        max: Date.now(),
        required: [true, 'please fill d_o_j']
    },
    degree: {
        type: String,
        required: [true, 'please fill degree']
    },
    gender: {
        type: String,
        required: [true,'please fill gender'],
        enum: ['male', 'female', 'other']
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: "superAdmin",
    }
}, { timestamps: true })

const Nurse = mongoose.model('nurse', nurseSchema);

module.exports = Nurse
