const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    room_no: {
        type: Number,
        required: [true, 'room_no is required'],
        unique: true,
    },//user filed should be required 
    doctor_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    }],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "superAdmin"
    }
}, { timestamps: true })

const Room = mongoose.model('room', roomSchema);

module.exports = Room
