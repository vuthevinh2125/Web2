const patientController = require('../controllers/PatientController')

const patientRoute = (app) => {
    app.route('/api/patients')
        .get(patientController.viewAllPatients)
        .post(patientController.createNewPatient)
        .delete(patientController.deleteAllPatients)
    app.route('/api/patients/:id')
        .get(patientController.viewPatientByID)
        .put(patientController.updatePatient)
        .delete(patientController.deletePatientByID)
    // app.route('/api/vocabs/:name')
    //     .get(patientController.searchPatientByName)
    // app.route('/api/patients/:sortAsc')
    //     .get(patientController.sortPatientAscending)
    // app.route('/api/patients/:sortDesc')
    //     .get(patientController.sortPatientDescending)

    app.route('/api/patients/search/:name') 
    .get(patientController.searchPatientByName);
}
module.exports = patientRoute