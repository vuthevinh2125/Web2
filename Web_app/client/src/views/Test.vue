<template>
  <div class="ui container" style="padding-top: 50px; text-align: center;">
    <h1 class="ui header">System Connection Test</h1>
    
    <div class="ui placeholder segment">
      <div class="ui icon header">
        <i class="server icon" :class="{green: isConnected, red: !isConnected}"></i>
        Server Status
      </div>
      
      <div class="ui large message" :class="{positive: isConnected, negative: !isConnected}">
        {{ apiMessage }}
      </div>

      <button class="ui primary button" @click="checkConnection" :class="{loading: isLoading}">
        <i class="sync icon"></i> Re-test Connection
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { callTestAPI } from '../helpers/api';

export default {
  name: 'Test',
  setup() {
    const apiMessage = ref("Waiting for server response...");
    const isConnected = ref(false);
    const isLoading = ref(false);

    const checkConnection = async () => {
        isLoading.value = true;
        const data = await callTestAPI();
        
        if (data && data.message) {
            apiMessage.value = data.message;
            isConnected.value = data.message.includes('success'); 
        } else {
            apiMessage.value = "Cannot connect to Backend Server";
            isConnected.value = false;
        }
        isLoading.value = false;
    };

    onMounted(() => {
        checkConnection();
    });

    return { apiMessage, isConnected, isLoading, checkConnection };
  }
}
</script>