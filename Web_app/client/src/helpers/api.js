import axios from "axios";

// Đường dẫn gốc tới API Backend
const backendUrl = 'http://localhost:3000/api/patients/';

// 1. Lấy danh sách tất cả bệnh nhân
export const viewAllPatients = async () => {
    try {
        const response = await axios.get(backendUrl);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// 2. Lấy thông tin 1 bệnh nhân theo ID (Dùng cho trang Edit)
export const getPatientById = async (id) => {
    try {
        const response = await axios.get(backendUrl + id);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// 3. Lấy thông tin 1 bệnh nhân theo ID (Dùng cho trang Show - Giữ lại để tránh lỗi code cũ)
export const viewPatientById = async (id) => {
    try {
        const response = await axios.get(backendUrl + id);    
        return response.data;
    } catch (err) {
        console.error(err);
        throw err; 
    }       
};

// 4. Tạo bệnh nhân mới
export const CreateNewPatient = async (patient) => {
    try {
        const response = await axios.post(backendUrl, patient);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// 5. Cập nhật thông tin bệnh nhân
export const updatePatient = async (id, patient) => {
    try {
        const response = await axios.put(backendUrl + id, patient);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// 6. Xóa 1 bệnh nhân theo ID
export const deletePatientByID = async (id) => {
    try {
        const response = await axios.delete(backendUrl + id);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};


// 7. Tìm kiếm bệnh nhân theo tên
export const searchPatientByName = async (name) => {
    try {
        // Gọi vào đường dẫn: /api/patients/search/:name
        const response = await axios.get(backendUrl + 'search/' + name);
        return response.data;
    } catch (err) {
        console.error("Search Patient By Name Error:", err);
        return []; // Trả về mảng rỗng nếu lỗi
    }
};

// 8. Xóa TẤT CẢ bệnh nhân
export const deleteAllPatients = async () => {
    try {
        // Gọi method DELETE vào đường dẫn gốc (/api/patients)
        const response = await axios.delete(backendUrl);
        return response.data;
    } catch (err) {
        console.error("Delete All Patients Error:", err);
        return null;
    }


};
export const callTestAPI = async () => {
    try {
        // Gọi vào đường dẫn test của Backend
        const response = await axios.get('http://localhost:3000/test');
        return response.data;
    } catch (err) {
        console.error("Test API Error:", err);
        return { message: "Connection Failed!" };
    }
};