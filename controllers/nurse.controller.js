const Nurse = require('../model/nurse.model');
const validateRole = require('../cutsomValidation/roleValidation');
const moment = require('moment');
const bcrypt = require('bcrypt');

const addNurse = async (req, res) => {

    const role = await validateRole(req.body.created_by);

    if (role == 'superAdmin' || role == 'doctor') {

        const password = bcrypt.hashSync(req.body.password, 10)

        const temp = JSON.parse(JSON.stringify(req.body)); temp["password"] = password;

        await Nurse.create(temp).then(values => { res.send(values) }).catch(error => { res.send(error.message) });

    } else {

        res.send(`without permission denied create nurse`)
    }
}

const getAllNurse = async (req, res) => {

    const result = await Nurse.find().populate({ path: 'created_by', select: 'name' });
    
    var data = result.map(item => {

        const age = moment(item.d_o_b).fromNow();

        const days = moment(item.d_o_j).fromNow();

        const temp = JSON.parse(JSON.stringify(item)); temp["age"] = age, temp["no_days"] = days; return temp;
    })

    res.status(200).send(data);

}

const getNurse = async (req, res) => {

    const role = await validateRole(req.params._id);

    if (role == 'nurse') {

        const result = await Nurse.findById(req.params._id).populate({ path: 'created_by', select: 'first_name', });

        const ages = moment(result.d_o_b);

        const age =  ages.fromNow();

        const day = moment(result.d_o_j);

        const no_days = day.fromNow();

        const temp = JSON.parse(JSON.stringify(result)); temp["age"] = age,temp["no_days"] = no_days;

        res.status(200).json({ result: temp });

    } else {

        res.send(`without permission denied get doctor`)
    }
}

const updateNurse = async (req, res) => {

    const role = await validateRole(req.body.created_by);

    if (role == 'superAdmin' || role == 'doctor') {

        await Nurse.findByIdAndUpdate(req.params._id, req.body);
        
        const result = await Nurse.findById(req.params._id)

        .then((result) => {
            res.status(200).send({ message: 'success', result });
        }).catch((err) => {
            res.status(400).send({ message: err.message });
        });

    } else {

        res.send(`without permission denied create nurse`)
    }
}


module.exports = {
    addNurse,
    getAllNurse,
    getNurse,
    updateNurse,
}
