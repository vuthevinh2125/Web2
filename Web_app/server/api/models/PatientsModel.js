const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    // english: String,
    // german: String
    
    name:{
        type: String,
        required: [true, "Name is compulsory"],
        minlengh: [3, "Minimum letter is 3"],
        maxlengh: [30, "Maximum letter is 3"],
    },
    age:{
        type: Number,
        required: [true, "Age is compulsory"],
        minlengh: [1, "Minimum letter is 1"],
        maxlengh: [3, "Maximum letter is 3"],
    },
    gender: {
        type: String,
        required: [true, "Gender is compulsory"],
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: 'Gender must be either Male or Female or Other' 
        }
    },
    address:{
        type: String,
        required: [true, "Address is compulsory"],
        minlengh: [3, "Minimum letter is 3"],
        maxlengh: [30, "Maximum letter is 3"],
    },
    phone:{
        type: Number,
        required: [true, "Phone is compulsory"],
        minlengh: [3, "Minimum letter is 3"],
        maxlengh: [15, "Maximum letter is 15"],
        unique:true
    },
    
})

const PatientsModel = mongoose.model('patients', patientSchema)

module.exports = PatientsModel