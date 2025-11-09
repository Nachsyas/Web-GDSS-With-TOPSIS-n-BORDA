const express=require('express')
const {  getAllUser, getUserById, updateUser, ubahPassword, createUser, deleteUser } = require('../controllers/userController')
const router=express.Router()

router.route('/').get(getAllUser).put(updateUser).post(createUser).delete(deleteUser)
router.post('/password',ubahPassword)
router.route('/find').get(getUserById)

// router.get('/', getAllUser);
// router.get('/find', getUserById); 
// router.post('/', createUser);
// router.put('/', updateUser);
// router.delete('/', deleteUser);
// router.post('/password', ubahPassword);

module.exports=router