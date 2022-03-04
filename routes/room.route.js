const {addRoom,getRoom,getAllRoom,updateRoom} = require('../controllers/room.controller')
const router = require('express').Router()


//room 
router.post('/room', addRoom);
router.get('/room/:_id', getRoom);
router.get('/room', getAllRoom);
router.put('/room/:_id', updateRoom);

module.exports = router;