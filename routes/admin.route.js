const { addAdmin,getAdmin,getAllAdmin,updateAdmin,deleteAdmin} = require('../controllers/admin.controller');
const router = require('express').Router()

//Admin 
router.post('/admin', addAdmin); // added admin data 
router.get('/admin',getAllAdmin ); // get admin data 
router.get('/admin/:_id', getAdmin);// getall admin data 
router.put('/admin/:_id', updateAdmin);// updated admin data 
router.delete('/admin/:_id',deleteAdmin)// delete admin data


module.exports = router