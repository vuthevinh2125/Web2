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

const searchPatientByName = async (req, res) => {
    try {
        const name = req.params.name;
        // RegExp 'i' để không phân biệt hoa thường
        const patients = await PatientsModel.find({ name: new RegExp(name, "i") });
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching patient");
    }
}

const deleteAllPatients = async (req, res) => {
    try {
        await PatientsModel.deleteMany();
        res.json({ message: 'All patients deleted' });
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    viewAllPatients,
    createNewPatient,
    deletePatientByID,
    updatePatient,
    viewPatientByID,
    searchPatientByName,
    deleteAllPatients,
    
}