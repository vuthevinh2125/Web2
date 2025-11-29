<template>
<div class="ui container show-patient-wrapper">
    <h2 class="ui header teal dividing">
        <i class="eye icon"></i>
        <div class="content">
            Patient Detail View
            <div class="sub header">Full medical information for patient: {{ patient.name }}</div>
        </div>
    </h2>

    <div v-if="isLoading" class="ui active centered inline loader teal"></div>

    <div v-else-if="patient._id" class="ui raised segment">
        <div class="ui two column stackable grid">
            <div class="six wide column">
                <div class="ui middle aligned selection list">
                    <div class="item">
                        <i class="large user icon teal middle aligned"></i>
                        <div class="content">
                            <div class="header" style="font-size: 1.5em;">{{ patient.name }}</div>
                            <div class="description">Record ID: {{ patient._id }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ten wide column">
                <h4 class="ui header">Personal Details</h4>
                <div class="ui definition list">
                    <div class="item">
                        <div class="term"><i class="birthday cake icon"></i> Age</div>
                        <div class="description">{{ patient.age }} years</div>
                    </div>
                    <div class="item">
                        <div class="term"><i class="venus mars icon"></i> Gender</div>
                        <div class="description">{{ patient.gender }}</div>
                    </div>
                    <div class="item">
                        <div class="term"><i class="phone icon"></i> Phone</div>
                        <div class="description">{{ patient.phone }}</div>
                    </div>
                    <div class="item">
                        <div class="term"><i class="map marker alternate icon"></i> Address</div>
                        <div class="description">{{ patient.address }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="ui negative message">
        <div class="header">Patient Not Found</div>
        <p>The requested patient record could not be loaded or does not exist.</p>
    </div>
    
    <div class="ui segment basic center aligned">
      <button class="ui secondary button" @click="router.back()">
        <i class="arrow left icon"></i> Go Back
      </button>
      <router-link :to="{name: 'Edit', params: {id: patient._id}}" class="ui primary button" v-if="patient._id">
        <i class="edit icon"></i> Edit Record
      </router-link>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// NOTE: Make sure your API helper has a function to fetch one patient by ID
import { viewPatientById } from '@/helpers/api'; 

export default {
    name: 'Show',
    setup() {
        const patient = ref({});
        const isLoading = ref(true);
        const route = useRoute();
        const router = useRouter();

        onMounted(async () => {
            const id = route.params.id;
            try {
                // Assuming viewPatientById is your API call to GET /patients/:id
                const data = await viewPatientById(id);
                patient.value = data;
            } catch (error) {
                console.error("Failed to fetch patient:", error);
                patient.value = {}; // Clear patient if fetch fails
            } finally {
                isLoading.value = false;
            }
        });

        return {
            patient,
            isLoading,
            router
        };
    }
};
</script>

<style scoped>
.show-patient-wrapper {
    padding-top: 20px;
    max-width: 900px;
    margin: 0 auto;
}
.ui.raised.segment {
    background-color: rgba(255, 255, 255, 0.95);
    padding: 30px !important;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
.ui.definition.list {
    margin-top: 1.5em;
}
.ui.definition.list .term {
    width: 8em;
    font-weight: bold;
    color: #00897b;
}
</style>