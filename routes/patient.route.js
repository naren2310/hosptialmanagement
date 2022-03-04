const { addPatient,getPatient, getAllPatient, updatePatient } = require('../controllers/patient.controller')
const router = require('express').Router()


router.post('/patient', addPatient);
router.get('/patient/:_id', getPatient)
router.get('/patient', getAllPatient);
router.put('/patient/:_id', updatePatient);

module.exports = router;