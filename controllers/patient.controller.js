const Patient = require('../model/patient.model');
const validateRole = require('../cutsomValidation/roleValidation');
const { nurseValidate,doctorValidate, roomValidate } = require('../cutsomValidation/validatedId')

const addPatient = async (req, res) => {

    const validateRoom = await roomValidate(req.body.room_id)

    const validateDoctor = await doctorValidate(req.body.doctor_id)

    const validateNurse = await nurseValidate(req.body.nurse_id)

    const role = await validateRole(req.body.created_by);

    if (validateRoom == 1) {

        if (validateDoctor == 1) {

            if (validateNurse == 1) {

                if (req.body.created_by == undefined) {

                    res.send(`role is required, role is undefined`)

                } else {

                    if (role == 'nurse') {

                        const count = await Patient.find().count()

                        const bill = `BILL${count + 1}`

                        const temp = JSON.parse(JSON.stringify(req.body)); temp["bill_no"] = bill;

                        const value = await Patient.create(temp)

                        res.status(200).json({ message: "patient added succesfully", data: value })

                    } else {

                        res.send(`without permission denied added patient `)
                    }
                }

            } else {

                res.send(`please Check nurse_id`)
            }

        } else {
            res.send(`please Check doctor_id`)
        }

    } else {
        res.send(`please Check room_id`)
    }
}

const getPatient = async (req, res) => {

    const result = Patient.findById(req.params._id).populate({path:'doctor_id',select:'first_name'})
    .populate({path:'nurse_id',select:'name'})
    .populate({path:'room_id',select: 'room_no'})
    .populate({ path: 'created_by', select: 'name' })
    
    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}

const updatePatient = async (req, res) => {

    
    const validateRoom = await roomValidate(req.body.room_id)

    const validateDoctor = await doctorValidate(req.body.doctor_id)

    const validateNurse = await nurseValidate(req.body.nurse_id)

    const role = await validateRole(req.body.created_by);

    if (validateRoom == 1) {

        if (validateDoctor == 1) {

            if (validateNurse == 1) {

                if (req.body.created_by == undefined) {

                    res.send(`role is required, role is undefined`)

                } else {

                    if (role == 'nurse') {

                        const value = await Patient.findByIdAndUpdate(req.params._id,req.body)

                        const result = await Patient.findById(req.params._id);

                        res.status(200).json({ message: "patient upadated uccesfully", data: result })


                    } else {

                        res.send(`without permission denied upadated patient`)
                    }
                }

            } else {

                res.send(`please check nurse_id`)
            }

        } else {
            res.send(`please check doctor_id`)
        }

    } else {
        res.send(`please check room_id`)
    }
}

const getAllPatient = async (req, res) => {

    const result = await Patient.find().populate({path:'doctor_id',select:'first_name'})
    .populate({path:'nurse_id',select:'name'})
    .populate({path:'room_id',select: 'room_no'})
    .populate({ path: 'created_by', select: 'name' })

    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });

}

module.exports = {
    addPatient,
    getPatient,
    getAllPatient,
    updatePatient
}
