const express=require('express')
const { addPenilaian } = require('../controllers/penilaianController')
const router=express.Router()

router.route('/').post(addPenilaian)

module.exports=router