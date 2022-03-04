const superAdmin = require('../model/superAdmin.model');
const validateRole = require('../cutsomValidation/roleValidation');

const addSuperAdmin = async(req,res)=>{
    
    const result = await new superAdmin(req.body);

    const count = await superAdmin.find().count();

    if(count < 1){
        result.save().then((data) => {
            res.status(200).send({ message: 'success', data });
        }).catch((err) => {
            res.status(400).send({ message: err.message });
        });
    }else {
        res.status(400).send('already have a super admin ')
    }
    
}

const getSuperAdmin = async (req,res)=>{
        
    const role = await validateRole(req.params._id);

    if (role == 'superAdmin') {

        await superAdmin.findById(req.params._id).then(values => { res.send(values) }).catch(error => { res.send(error.message) });

    } else {

        res.send(`without permission denied get superAdmin `)
    }

}

const updateSuperAdmin = async (req,res)=>{

    const role = await validateRole(req.params._id);

    if (role == 'superAdmin') {

         superAdmin.findByIdAndUpdate(req.params._id,req.body)

        .then(async(values) => { 
            
          const result = await superAdmin.findById(req.params._id)

            res.send({message:'upadated sucessfully ', data:result}) })

        .catch(error => { res.send(error.message) });

    } else {

        res.send(`without permission denied updated superAdmin `)
    }
}


module.exports = {
    addSuperAdmin,
    getSuperAdmin,
    updateSuperAdmin
}