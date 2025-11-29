<template>
<div class="ui container add-patient-wrapper">
    <h2 class="ui header teal dividing">
        <i class="plus square outline icon"></i>
        <div class="content">
            Add New Patient Record
            <div class="sub header">Enter comprehensive information for the new patient.</div>
        </div>
    </h2>

    <form class="ui form segment raised" @submit.prevent="onSubmit">

        <div class="field">
            <label>Name</label>
            <div class="ui labeled input fluid">
                <div class="ui label teal"><i class="id card outline icon"></i></div>
                <input type="text" required v-model="patient.name" placeholder="Full Name" />
            </div>
        </div>

        <div class="field">
            <label>Age</label>
            <div class="ui labeled input fluid">
                <div class="ui label teal"><i class="birthday cake icon"></i></div>
                <input type="number" required v-model.number="patient.age" placeholder="Age in years" /> 
            </div>
        </div>

        <div class="field">
            <label>Gender</label>
            <div class="ui labeled input fluid">
                <div class="ui label teal"><i class="venus mars icon"></i></div>
                <select v-model="patient.gender" class="ui fluid dropdown selection" required style="flex: 1;">
                    <option disabled value="">Please select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>

        <div class="field">
            <label>Address</label>
            <div class="ui labeled input fluid">
                <div class="ui label teal"><i class="map marker alternate icon"></i></div>
                <input type="text" required v-model="patient.address" placeholder="e.g., 123 Main St, City" />
            </div>
        </div>

        <div class="field">
            <label>Phone</label>
            <div class="ui labeled input fluid">
                <div class="ui label teal"><i class="phone icon"></i></div>
                <input type="text" required v-model="patient.phone" placeholder="e.g., 555-123-4567" />
            </div>
        </div>

        <button class="ui primary fluid button large"><i class="save icon"></i> Submit Record</button>
    </form>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CreateNewPatient } from '@/helpers/api';

export default {
    name: 'New',
    setup() {
        const patient = ref({
            name: '',
            age: null, // Initialize age as null for number binding
            gender: '',
            address: '',
            phone: ''
        });
        const router = useRouter();
        
        const onSubmit = async () => {
            if (!patient.value.name || !patient.value.age || !patient.value.gender) {
                // Basic client-side check
                alert("Please fill in all required fields.");
                return;
            }
            
            await CreateNewPatient(patient.value);
            router.push('/patients');
        };

        return {
            patient,
            onSubmit
        };
    }
};
</script>

<style scoped>
/* Translucent background box for the form */
.add-patient-wrapper {
    padding-top: 20px;
    max-width: 700px; /* Limits the form width */
    margin: 0 auto; /* Centers the wrapper */
}
.ui.segment.raised {
    background-color: rgba(255, 255, 255, 0.95); /* Translucent white box */
    padding: 40px !important;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
/* Style adjustments for labeled inputs in Semantic UI */
.ui.labeled.input.fluid input {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}
.ui.labeled.input.fluid .ui.label {
    background-color: #d8f5f3 !important; /* Light teal for icon labels */
    color: #00897b !important;
}
</style>