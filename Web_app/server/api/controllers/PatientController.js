const PatientsModel = require('../models/PatientsModel')

const viewAllPatients = async (req, res) =>{
    try{
        const patients = await PatientsModel.find({})
        res.status(200).json(patients)
    }catch (err){
        console.error(err)
    }
}

const createNewPatient = async (req, res) => {
    try{
        const patient = req.body
        await PatientsModel.create(patient)
        res.status(201).json(patient)
    } catch (err){
        console.error(err)
    }
}

const deletePatientByID = async (req,res) =>{
    try{
        const id = req.params.id
        await PatientsModel.findByIdAndDelete(id)
        res.json({message : 'delete success'})
    } catch (err){
        console.error(err)
    }
}

const updatePatient = async (req,res) =>{
    try{
        const id = req.params.id
        const updated = await PatientsModel.findByIdAndUpdate(id, req.body);
        res.json({message : 'update success'})
    } catch (err){
        console.error(err)
    }
}

const viewPatientByID = async (req,res) =>{
    try{
        const patient = await PatientsModel.findById(req.params.id)
        res.json(patient)
    } catch (err){
        console.error(err)
    }
}





module.exports = {
    viewAllPatients,
    createNewPatient,
    deletePatientByID,
    updatePatient,
    viewPatientByID,
    
}