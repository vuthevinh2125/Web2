<template>
    <div>
        <h1>New Patient</h1>
        <form action="" @submit.prevent="onSubmit">
            
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="id card outline icon"></i> Name</div>
                <input type="text" required v-model="patient.name" style="width: 100% !important;">
            </div>
            <br>
            <div class="ui labeled input fluid">
        <div class="ui label">
            <i class="venus mars icon"></i> Gender
        </div>
        
        <select v-model="patient.gender" class="ui fluid dropdown" required style="border: 1px solid rgba(34,36,38,.15); border-radius: 0 4px 4px 0; padding: 0 10px; flex: 1;">
            <option disabled value="">Please select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        </div>
        <br />
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="birthday cake icon"></i> Age</div>
                <input type="text" required v-model="patient.age" style="width: 98% !important;">
            </div>
            <br>
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="map marker alternate icon"></i> Address</div>
                <input type="text" required v-model="patient.address" style="width: 100% !important;">
            </div>
            <br>
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="phone icon"></i> Phone</div>
                <input type="text" required v-model="patient.phone" style="width: 100% !important;">
            </div>
            <br>
            <button class="ui primary button">Submit</button>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPatientById, updatePatient } from '../helpers/api';

export default {
    name : "Edit",
    setup(){
        const patient = ref ({});
        const route = useRoute();
        const router = useRouter();

        onMounted(async() =>{
            const result = await getPatientById(route.params.id);
            if (result == null){
                alert("Falied to load patient data")
                patient.value = {};
            } else{
                patient.value = result;
            }
        })

        const onSubmit = async() =>{
            const result = await updatePatient(route.params.id, patient.value)
            if(result == null){
                alert("Failed to update patient")
                return;
            }
            router.push('/patients');
        }

        return{
            patient,
            onSubmit
        }
    }
}

</script>
