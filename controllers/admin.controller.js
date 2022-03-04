const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const validateRole = require('../cutsomValidation/roleValidation');

const addAdmin = async (req, res) => {

    const role = await validateRole(req.body.created_by);

    if (role == 'superAdmin') {

        const password = bcrypt.hashSync(req.body.password, 10)

        const temp = JSON.parse(JSON.stringify(req.body)); temp["password"] = password;

        await Admin.create(temp).then(values => { res.send(values) }).catch(error => { res.send(error.message) });

     }else {
         res.status(400).send('without permission denied add admin')
     }
}


const getAdmin = async (req, res) => {

    const result = await Admin.findById(req.params._id).populate({path:'created_by',select:'name'})
    
    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}

const getAllAdmin = async (req, res) => {

    const result = await Admin.find().populate({path:'created_by',select:'name'})
    
    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}

const updateAdmin = async(req,res)=>{

    const role = await validateRole(req.body.created_by);

    if (role == 'superAdmin') {

        await Admin.findByIdAndUpdate(req.params._id,req.body)

        .then(async() => {
            const results =  await Admin.findById(req.params._id);
    
        res.status(200).send({message: "updated successfully",data:results})
        
        }).catch((err) => {
            res.status(400).send({ message: err.message });
        });

     }else {
         res.status(400).send('without permission denied updated admin')
     }

}

const deleteAdmin  = async(req,res)=>{

    const result = await Admin.findByIdAndDelete(req.params._id)

    .then((result) => {
        res.status(200).send({ message: 'success', result });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}

module.exports = {
    addAdmin,
    getAllAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin

} 