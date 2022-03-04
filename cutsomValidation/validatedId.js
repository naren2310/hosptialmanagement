
const Doctor = require('../model/doctor.model')
const Nurse  = require('../model/nurse.model')
const Room  = require('../model/room.model')



const nurseValidate = async (id) => {

    const result = await Nurse.findById(id)

    if (result != null) {

        return 1;

    } else {

        return 0;
    }
}

const doctorValidate = async (id) => {

    const result = await Doctor.findById(id)

    if (result != null) {

        return 1;

    } else {

        return 0;
    }
}


const roomValidate = async (id) => {

    const result = await Room.findById(id)

    if (result != null) {

        return 1;
        
    } else {

        return 0;
    }
}

module.exports = { nurseValidate, doctorValidate, roomValidate }