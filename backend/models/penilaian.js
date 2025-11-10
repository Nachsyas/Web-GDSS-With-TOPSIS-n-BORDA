const mongoose=require('mongoose')

const penilaianSchema=new mongoose.Schema({
    id_user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tanggal_penilaian:{
        type:Date,
        required:true
    },
    id_alternatif:{
        type:Schema.Types.ObjectId,
        ref:'Alternatif',
        required:true
    },
    id_kriteria:{
        type:Schema.Types.ObjectId,
        ref:'Kriteria',
        required:true
    },
    nilai:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('Penilaian',penilaianSchema)