const express=require('express')
const {  getAllUser, getUserById, updateUser, ubahPassword } = require('../controllers/userController')
const router=express.Router()

router.route('/').get(getAllUser).post(updateUser)
router.post('/password',ubahPassword)
router.route('/:id').get(getUserById)

module.exports=router