<template>
  <div class="login-container">
    <div class="ui middle aligned center aligned grid" style="height: 100%">
      <div class="column" style="max-width: 450px;">
        <h2 class="ui teal image header">
          <div class="content"> ADMIN LOGIN </div>
        </h2>
        <form class="ui large form" @submit.prevent="handleLogin">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" v-model="username" placeholder="Username" required>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" v-model="password" placeholder="Password" required>
              </div>
            </div>
            <button class="ui fluid large teal submit button" :class="{loading: isLoading}">Login</button>
          </div>
          <div class="ui error message" v-if="errorMsg" style="display: block">{{ errorMsg }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  name: 'Login',
  data() { return { username: '', password: '', errorMsg: '', isLoading: false } },
  methods: {
    async handleLogin() {
      this.isLoading = true; 
      this.errorMsg = '';
      try {
        // Gọi API Login
        const res = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });
        // Lưu token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        
        // Chuyển thẳng vào trang quản lý
        this.$router.push('/home');
      } catch (err) {
        this.errorMsg = "Incorrect username or password!";
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container { background-color: #DADADA; height: 100vh; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; }
</style>