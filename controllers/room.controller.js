const Room = require('../model/room.model');
const validateRole = require('../cutsomValidation/roleValidation')

const addRoom = async (req, res) => {

    const role = await validateRole(req.body.created_by);

    if (role == 'superAdmin') {

        await Room.create(req.body).then((value) => { res.status(200).json({ message: "room creater succesfully", data: value }) }).catch((error) => {

            res.json({ message: error.message })

        })
    } else {

        res.send(`without permission denied add room `)
    }

}

const getAllRoom = async (req, res) => {

    const result = await Room.find().populate({ path: 'doctor_id', select: 'first_name' }).populate({ path: 'created_by', select: 'name' })

    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });

}

const getRoom = async (req, res) => {

    const id = req.params._id

    const result = await Room.findById(id).populate({ path: 'doctor_id', select: 'first_name' }).populate({ path: 'created_by', select: 'name' })

    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}


const updateRoom = async (req, res) => {

    const role = await validateRole(req.body.created_by);

    if (role == 'superAdmin') {

       const value =  await Room.findByIdAndUpdate(req.params._id, req.body)

        const result = await Room.findById(req.params._id)

            .then((result) => { res.status(200).json({ message: "room updated Succesfully", data: result }) })

            .catch((error) => {

                res.json({ message: error.message })

            })

    }
    else {

        res.send(`without perimission denied updated room `)
    }
}

module.exports = {
    addRoom,
    getRoom,
    getAllRoom,
    updateRoom,
}