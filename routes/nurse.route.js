const { addNurse,getNurse,getAllNurse,updateNurse} = require('../controllers/nurse.controller');
const router = require('express').Router()

//nurse add nurse 
router.post('/nurse', addNurse);
router.get('/nurse/:_id', getNurse);
router.get('/nurse', getAllNurse)
router.put('/nurse/:_id', updateNurse);

module.exports = router;