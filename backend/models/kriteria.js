const mongoose=require('mongoose')

const kriteriaSchema=new mongoose.Schema({
    nama:{
        type: String,
        required: true
    },
    tipe:{
        type: String,
        required: true
    },
    bobot:{
        type: Number,
        required: true
    }
},{timestamps:true})

module.exports=mongoose.model('Kriteria',kriteriaSchema)