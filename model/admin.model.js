const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minLength: [3, "name min length 3 characters"]
    },//user filed should be required 
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },// email filed should be required 
    password: {
        type: String,
        // default: bcrypt.hashSync("password", 10)
    },//password filed should be required
    created_by: {
        type: String,
        required: true,
        ref: 'superAdmin'
    }
}, { timestamps: true })

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin
