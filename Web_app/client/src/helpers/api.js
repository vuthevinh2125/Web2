import axios from "axios";

const backendUrl = 'http://localhost:3000/api/patients/';

export const viewAllPatients = async () =>{
    try{
        const response = await axios.get(backendUrl);
        return response.data;
    }catch (err){
        console.error(err);
        return null;
    }
};

export const viewAllPatientsById = async (id) =>{
    try{
        const response = await axios.get(backendUrl + id);
        return response.data;
    }catch (err){
        console.error(err);
        return null;
    }
};

export const deletePatientByID = async (id) =>{
    try{
        const response = await axios.delete(backendUrl + id);
        return response.data;
    }catch (err){
        console.error(err);
        return null;
    }
};

export const CreateNewPatient = async (patient) =>{
    try{
        const response = await axios.post(backendUrl, patient);
        return response.data;
    }catch (err){
        console.error(err);
        return null;
    }
};

export const updatePatient = async (id, patient) =>{
    try{
        const response = await axios.put(backendUrl + id, patient);
        return response.data;
    }catch (err){
        console.error(err);
        return null;
    }
};

export const getPatientById = async (id) =>{
    try{
        const response = await axios.get(backendUrl + id);
        return response.data;
    }catch (err){
        console.error(err);
        return null;
    }
};

export const viewPatientById = async (id) => {
    try {
        // Replace with your actual endpoint path
        const response = await axios.get(backendUrl + id);    
        return response.data;
    } catch (err) {
        console.error(error);
        throw error; 
    }       
};