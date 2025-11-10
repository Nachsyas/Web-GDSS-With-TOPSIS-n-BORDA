const Kriteria=require('../models/kriteria')
const mongoose=require('mongoose')

const toTitleCase=(str)=>{
    return str
    .toLowerCase()
    .split(' ')
    .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(' ')
}

const addKriteria=async(req,res)=>{
    const {nama,tipe,bobot}=req.body

    try{
        await Kriteria.create({
            nama:nama,
            tipe:tipe,
            bobot:bobot
        })

        res.sendStatus(201)
    }catch(e){
        res.statu(500).json({message:"Error menambah kriteria ke database: ",e})
    }
}

const deleteKriteria=async (req,res)=>{
    const {id_kriteria}=req.query

    try{
        await Kriteria.findByIdAndDelete(id_kriteria)

        res.sendStatus(200)
    }catch(e){
        res.status(500).json({message:`Error hapus kriteria id ${id_kriteria}: ${e}`})
    }
}

const updateKriteria=async (req,res)=>{
    const {id_kriteria,nama,tipe,bobot}=req.body

    try{
        const existingKriteria=await Kriteria.findById(id_kriteria)

        if(!existingKriteria){
            res.status(500).json({message:"Tidak ada kriteria yang sesuai ditemukan"})
        }

        existingKriteria.nama=nama
        existingKriteria.tipe=tipe
        existingKriteria.bobot=bobot

        await existingKriteria.save()

        res.sendStatus(200)
    }catch(e){
        res.status(500).json({message:`Error update data kriteria id ${id_kriteria}: ${e}`})
    }
}

const getAllKriteria=async(req,res)=>{
    try{
        const response=await Kriteria.find().sort({tipe:-1})

        res.status(200).json(response)
    }catch(e){
        res.status(500).json({message:"Error menampilkan semua data kriteria dari database: ",e})
    }
}

const getKriteriaById=async(req,res)=>{
    const {id_kriteria}=req.params

    try{
    const response=await Kriteria.findById(id_kriteria)

        res.status(200).json(response)
    }catch(e){
        res.status(500).json({message:`Error mengambil data kriteria id:${id_kriteria}: ${e}`})
    }
}

const getKriteriaByTipe=async(req,res)=>{
    let {tipe}=req.params

    tipe=toTitleCase(tipe)

    try{
        const response=await Kriteria.find({tipe:tipe}).sort({nama:1})

        res.status(200).json(response)
    }catch(e){
        res.status(500).json({message:`Error mengambil kriteria tipe ${tipe}: ${e}`})
    }
}

const getTotalKriteria=async (req,res)=>{
    try{
        const total=await Kriteria.countDocuments()

        res.status(200).json(total)
    }catch(e){
        res.status(500).json({message:"Error mengambil total kriteria dari database: ",e})
    }
}

module.exports={addKriteria,getAllKriteria,getKriteriaById,getKriteriaByTipe,updateKriteria,deleteKriteria,getTotalKriteria}