const {addDoctor,getDoctor,getAllDoctor,updateDoctor } = require('../controllers/doctor.controller');
const router = require('express').Router();


//doctor
router.post('/doctor', addDoctor);
router.get('/doctor/:_id', getDoctor);
router.get('/doctor', getAllDoctor);
router.put('/doctor/:_id', updateDoctor);

module.exports = router