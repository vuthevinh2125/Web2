<template>
  <div class="ui container patient-list-wrapper">
    <h2 class="ui header teal dividing">
        <i class="list alternate outline icon"></i>
        <div class="content">
            Patient Records
            <div class="sub header">Manage and update all patient information.</div>
        </div>
    </h2>

    <table class="ui celled selectable striped table">
      <thead>
        <tr>
          <th><i class="user icon"></i> Patient</th>
          <th class="one wide"><i class="birthday cake icon"></i> Age</th>
          <th class="two wide"><i class="venus mars icon"></i> Gender</th>
          <th><i class="map marker icon"></i> Address</th>
          <th><i class="phone icon"></i> Phone</th>
          <th colspan="3" class="two wide center aligned"><i class="cogs icon"></i> Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, index) in patients" :key="index">
          <td data-label="Name" class="four wide">{{ patient.name }}</td>
          <td data-label="Age" class="center aligned">{{ patient.age }}</td>
          
          <td data-label="Gender" :class="{'positive': patient.gender === 'Male', 'negative': patient.gender === 'Female'}">
            {{ patient.gender }}
          </td>
          
          <td data-label="Address">{{ patient.address }}</td>
          <td data-label="Phone">{{ patient.phone }}</td>
          
          <td class="center aligned" width="50">
            <router-link class="ui icon button tiny blue" :to="{name: 'Show',params: {id:patient._id}}">
                <i class="eye icon"></i>
            </router-link>
          </td>
          <td class="center aligned" width="50">
            <router-link class="ui icon button tiny yellow" :to="{name: 'Edit',params: {id:patient._id}}">
                <i class="edit icon"></i>
            </router-link>
          </td>
          <td class="center aligned" width="50">
            <a class="ui icon red button tiny" @click.prevent="onDelete(patient._id)">
                <i class="trash icon"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
            <th colspan="8">
                <router-link to="/patients/new" class="ui button primary right floated">
                    <i class="plus icon"></i> Add New Patient
                </router-link>
            </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import {ref, onMounted } from "vue";
import Swal from 'sweetalert2'; // Import SweetAlert2
import {viewAllPatients, deletePatientByID } from "../helpers/api";

export default {
  name: "Patients", 
  setup() {
    const patients = ref([]);

    const fetchPatients = async () => {
        patients.value = (await viewAllPatients()) || [];
    };

    onMounted(async () =>{
        fetchPatients();
    });
    
    const onDelete = async (id) => {
        // Use SweetAlert2 for deletion confirmation
        const result = await Swal.fire({
            title: "Confirm Record Deletion?",
            text: "Data will be permanently deleted from the system!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed){
            await deletePatientByID(id);
            // Success notification
            await Swal.fire("Deleted!", "The record has been removed.", "success");
            fetchPatients();
        }
    };

    return {
        patients,
        onDelete,
    };
  },
};
</script>

<style scoped>
/* Scoped CSS for specific component styling */
.positive {
    background-color: #e0fff9 !important; /* Light teal for Male */
    font-weight: 500;
}
.negative {
    background-color: #fff0f0 !important; /* Light pink for Female */
    font-weight: 500;
}
/* Translucent background box for the table on the busy body background */
.patient-list-wrapper {
    padding-top: 20px;
    background-color: rgba(255, 255, 255, 0.9); /* Makes the box translucent white */
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>