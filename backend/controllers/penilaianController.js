const Penilaian=require('../models/penilaian')

const addPenilaian=async (req,res)=>{
    const {id_user,tanggal_penilaian,id_alternatif,id_kriteria,nilai,keterangan}=req.body

    const dateParts=tanggal_penilaian.split("/")
    const [bulan,hari,tahun]=dateParts
    const formattedDate=`${tahun}-${bulan}-${hari}`

    try{
        await Penilaian.create({
            id_user:id_user,
            tanggal_penilaian:formattedDate,
            id_alternatif:id_alternatif,
            id_kriteria:id_kriteria,
            nilai:nilai,
            keterangan:keterangan
        })

        res.sendStatus(201)
    }catch(e){
        res.status(500).json({message:"Error dalam memasukkan data penilaian ke database: ",e})
    }
}

module.exports={addPenilaian}