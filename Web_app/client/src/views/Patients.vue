<template>
  <div class="ui container patient-list-wrapper">
    <h2 class="ui header teal dividing">
        <i class="list alternate outline icon"></i>
        <div class="content">
            Patient Records
            <div class="sub header">Manage and update all patient information.</div>
        </div>
    </h2>

    <div class="ui stackable grid">
        <div class="six wide column">
            <div class="ui icon input fluid">
                <input type="text" placeholder="Search by name..." v-model="searchQuery" @keyup.enter="handleSearch">
                <i class="search icon link" @click="handleSearch"></i>
            </div>
        </div>
        <div class="ten wide column right aligned">
            <router-link to="/patients/new" class="ui button primary">
                <i class="plus icon"></i> Add New
            </router-link>
            
            <button class="ui red button" @click="onDeleteAll" v-if="patients.length > 0">
                <i class="trash alternate icon"></i> Delete All
            </button>
        </div>
    </div>
    <br>

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
        <tr v-for="(patient, index) in paginatedPatients" :key="index">
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

        <tr v-if="patients.length === 0">
            <td colspan="8" class="center aligned">
                <div class="ui message info">No records found.</div>
            </td>
        </tr>
      </tbody>
    </table>

    <div class="ui grid centered" v-if="totalPages > 1" style="margin-top: 10px;">
        <div class="ui pagination menu">
            <a class="item" :class="{disabled: currentPage === 1}" @click="prevPage">
                <i class="chevron left icon"></i>
            </a>
            
            <div class="item disabled">
                Page {{ currentPage }} of {{ totalPages }}
            </div>

            <a class="item" :class="{disabled: currentPage === totalPages}" @click="nextPage">
                <i class="chevron right icon"></i>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
// Import thêm 'computed' để tính toán phân trang
import { ref, onMounted, computed } from "vue";
import Swal from 'sweetalert2'; 
import { viewAllPatients, deletePatientByID, searchPatientByName, deleteAllPatients } from "../helpers/api";

export default {
  name: "Patients", 
  setup() {
    //  Khai báo biến 
    const patients = ref([]);
    const searchQuery = ref("");
    
    // Cấu hình Phân trang
    const currentPage = ref(1);
    const itemsPerPage = 5; 

    // 1. Cắt danh sách bệnh nhân dựa trên trang hiện tại
    const paginatedPatients = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return patients.value.slice(start, end);
    });

    // 2. Tính tổng số trang
    const totalPages = computed(() => {
        return Math.ceil(patients.value.length / itemsPerPage);
    });

    // 3. Hàm chuyển trang
    const prevPage = () => {
        if (currentPage.value > 1) currentPage.value--;
    };
    const nextPage = () => {
        if (currentPage.value < totalPages.value) currentPage.value++;
    };

    //API Calls
    const fetchPatients = async () => {
        patients.value = (await viewAllPatients()) || [];
    };

    const handleSearch = async () => {
        if (searchQuery.value.trim() === "") {
            await fetchPatients();
        } else {
            const result = await searchPatientByName(searchQuery.value);
            patients.value = result || [];
            currentPage.value = 1; // Reset về trang 1 khi tìm kiếm
        }
    };

    const onDeleteAll = async () => {
        const result = await Swal.fire({
            title: "DELETE ALL RECORDS?",
            text: "This action cannot be undone! Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete Everything!"
        });

        if (result.isConfirmed) {
            await deleteAllPatients();
            await Swal.fire("Deleted!", "All records have been wiped.", "success");
            fetchPatients();
        }
    };

    const onDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete this record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        });

        if (result.isConfirmed){
            await deletePatientByID(id);
            await Swal.fire("Deleted!", "Removed.", "success");
            await fetchPatients();
            
            // Nếu xóa hết item ở trang cuối cùng thì tự động lùi lại 1 trang
            if (paginatedPatients.value.length === 0 && currentPage.value > 1) {
                currentPage.value--;
            }
        }
    };

    onMounted(async () =>{
        fetchPatients();
    });

    // Return tất cả ra Template
    return {
        patients,
        searchQuery,
        handleSearch,
        onDeleteAll,
        onDelete,
        // Variables cho phân trang
        paginatedPatients,
        currentPage,
        totalPages,
        prevPage,
        nextPage
    };
  },
};
</script>

<style scoped>
.positive {
    background-color: #e0fff9 !important; 
    font-weight: 500;
}
.negative {
    background-color: #fff0f0 !important; 
    font-weight: 500;
}
.patient-list-wrapper {
    padding-top: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    min-height: 500px; 
}
</style>