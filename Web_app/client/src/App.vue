<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          
          <router-link to="/home" class="item">
            <i class="home icon"></i> Home
          </router-link>
          
          <router-link to="/patients" class="item">
            <i class="list icon"></i> Patients
          </router-link>
          
          <router-link to="/patients/new" class="item">
            <i class="plus icon"></i> Add New Patient
          </router-link>
          
          
          
          <div class="item">
            <i class="user icon"></i> Admin
          </div>
          <a class="item" @click.prevent="$router.push('/login')">
            <i class="sign-out icon"></i> Logout
          </a>
        </div>
      </div>
    </div>

    <div style="padding-top: 20px;">
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isLoggedIn: false,
            username: ''
        }
    },
    computed: {
        isLoginPage() {
            return this.$route.path === '/login';
        }
    },
    methods: {
        checkLoginStatus() {
            // Chỉ cần kiểm tra token, vì đây là căn cứ chính cho việc xác thực
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('username');
            
            if (token) {
                this.isLoggedIn = true;
                this.username = user || 'Admin';
            } else {
                this.isLoggedIn = false;
                this.username = '';
            }
        },
        handleLogout() {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('username');
            
            this.isLoggedIn = false;
            this.username = '';
            
            this.$router.push('/login');
            
          
        }
    },
    // Watch for route changes to update the menu dynamically
    watch: {
        $route() {
            this.checkLoginStatus();
        }
    },
    mounted() {
        this.checkLoginStatus();
    }
}
</script>

<style>
body, html {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
}
.ui.inverted.segment.navbar {
    margin-bottom: 20px !important;
    border-radius: 0 !important;
    z-index: 1000;
}
</style>