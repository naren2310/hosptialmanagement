const Doctor = require('../model/doctor.model');
const validateRole = require('../cutsomValidation/roleValidation');
const { nurseValidate, roomValidate } = require('../cutsomValidation/validatedId');
const bcrypt = require('bcrypt');
const moment = require('moment');

const addDoctor = async (req, res) => {

    const validateNurse = await nurseValidate(req.body.nurse_id)

    if (validateNurse == 1) {

        const validateRoom = await roomValidate(req.body.room_id)

        if (validateRoom == 1) {

            if (req.body.created_by == undefined) {

                res.send(`please enter your role is required, role is undefined`)

            } else {

                const role = await validateRole(req.body.created_by);

                if (role == 'superAdmin' || role == 'nurse') {

                    const password = bcrypt.hashSync(req.body.password, 10)

                    const temp = JSON.parse(JSON.stringify(req.body)); temp["password"] = password;

                    await Doctor.create(temp).then(values => { res.send(values) }).catch(error => { res.send(error.message) });

                } else {

                    res.send(`without permission denied create doctor`)
                }
            }

        } else {

            res.send(`please check room_id`)
        }

    } else {
        res.send(`please check nurse_id`)
    }
}

const getDoctor = async (req, res) => {

    const role = await validateRole(req.params._id);

    if (role == 'doctor') {

        const result = await Doctor.findById(req.params._id).populate({path: 'nurse_id', populate: { path: 'created_by',select:'name' } })
        .populate({path:'room_id',populate:{path:'doctor_id',select:'first_name'}})
        .populate({ path: 'created_by', select: 'name' });

        const age = moment(result.d_o_b).fromNow();

        const no_days = moment(result.d_o_j).fromNow();

        const temp = JSON.parse(JSON.stringify(result)); temp["age"] = age,temp["no_days"] = no_days;

        res.status(200).json({ result: temp });

    } else {

        res.send(`without permission denied get doctor`)
    }


}

const getAllDoctor = async (req, res) => {

    const result = await Doctor.find().populate({path: 'nurse_id', populate: { path: 'created_by',select:'name' }
    }).populate({path:'room_id',populate:{path:'doctor_id',select:'first_name'}})
    .populate({ path: 'created_by', select: 'name' });

    var data = result.map(item => {

        const age = moment(item.d_o_b).fromNow();

        const days = moment(item.d_o_j).fromNow();

        const temp = JSON.parse(JSON.stringify(item)); temp["age"] = age, temp["no_days"] = days; return temp;
    })

    res.status(200).send(data);

}

const updateDoctor = async (req, res) => {

    const validateNurse = await nurseValidate(req.body.nurse_id)

    if (validateNurse == 1) {

        const validateRoom = await roomValidate(req.body.room_id)

        if (validateRoom == 1) {

            if (req.body.created_by == undefined) {

                res.send(`please enter your role is required, role is undefined`)

            } else {

                const role = await validateRole(req.body.created_by);

                if (role == 'superAdmin' || role == 'nurse') {

                    await Doctor.findByIdAndUpdate(req.params._id, req.body);

                    const result = await Doctor.findById(req.params._id)

                        .then((result) => {
                            res.status(200).send({ message: 'success', result });
                        }).catch((err) => {
                            res.status(400).send({ message: err.message });
                        });

                } else {

                    res.send(`without permission denied upadate doctor`)
                }
            }

        } else {

            res.send(`please give correct room_id `)
        }

    } else {
        res.send(`please give correct nurse_id`)
    }
}


module.exports = {
    addDoctor,
    getDoctor,
    getAllDoctor,
    updateDoctor,
}