const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const DATABASE_URL = "mongodb://localhost:27017/Patients"
mongoose.connect(DATABASE_URL)
    .then(() => console.log('Connect to DB succeed!'))
    .catch((err) => console.log('Connect to DB failed!', err))
// Middleware
app.use(express.json())
app.use(cors());

const authController = require('./api/controllers/AuthController'); 
const patientRouter = require('./api/routes/PatientRoute');

app.post('/login', authController.login);

// Route quản lý bệnh nhân
patientRouter(app);

//test page
app.get('/test', (req, res) => {
    // Trả về JSON đơn giản
    res.json({ message: "Backend is running successfully! Connection established." });
});

// Chạy Server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})