const { addSuperAdmin,getSuperAdmin,updateSuperAdmin} = require('../controllers/superAdmin.controller');
const router = require('express').Router()

//Admin 
router.post('/superAdmin', addSuperAdmin);
router.get('/superAdmin/:_id', getSuperAdmin);
router.put('/superAdmin/:_id', updateSuperAdmin)


module.exports = router