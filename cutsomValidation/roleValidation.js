
const Admin  = require('../model/admin.model');
const Doctor  = require('../model/doctor.model')
const Nurse = require('../model/nurse.model');
const superAdmin = require('../model/superAdmin.model');

const validateRole = async (id) => {

    if (id != undefined) {

        const superadmin = await superAdmin.findById(id).then(value => { return value }).catch(error=>{return null})

        const admin = await Admin.findById(id).then(value => { return value }).catch(error => { return null });

        const doctor = await Doctor.findById(id).then(value => { return value }).catch(error => { return null });

        const nurse = await Nurse.findById(id).then(value => { return value }).catch(error => { return null });


        if (superadmin != null) {

            return 'superAdmin';
        }
        if (admin != null) {

            return 'admin';
        }
        if (doctor != null) {

            return 'doctor';

        } if (nurse != null) {

            return 'nurse'

        } else {

            return null;
        }

    } else {

        return undefined;
    }
}
module.exports = validateRole;