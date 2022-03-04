const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const superAdminSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "name min length 3 characters"],
        default: "superAdmin"
    },//user filed should be required 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        default: "superAdmin@gmail.com"
    },// email filed should be required 
    password: {
        type: String,
        default: bcrypt.hashSync("password", 10)
    },//password filed should be required
}, { timestamps: true })

const superAdmin = mongoose.model('superAdmin', superAdminSchema);

module.exports = superAdmin
