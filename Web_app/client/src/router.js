import { createRouter, createWebHistory } from 'vue-router'

import Patients from './views/Patients.vue'
import Show from './views/Show.vue'
import New from './views/New.vue'
import Edit from './views/Edit.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

const routes = [
    {
        path: '/',
        redirect: '/home' 
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/patients',
        name: 'Patients',
        component: Patients,
        meta: { requiresAuth: true }
    },
    {
        path: '/patients/new',
        name: 'New',
        component: New,
        meta: { requiresAuth: true }
    },
    {
        path: '/patients/show/:id',
        name: 'Show',
        component: Show,
        meta: { requiresAuth: true }
    },
    {
        path: '/patients/edit/:id',
        name: 'Edit',
        component: Edit,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes 
})

router.beforeEach((to, from, next) => {
    // 1. Kiểm tra xem trang muốn đến có yêu cầu đăng nhập không (meta: requiresAuth)
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 2. Nếu cần, kiểm tra Token trong Local Storage
        if (!localStorage.getItem('token')) {
            // 3. Không có Token -> Đá về trang Login
            next({ name: 'Login' });
        } else {
            // 4. Có Token -> Cho đi tiếp
            next();
        }
    } else {
        // Trang không yêu cầu bảo mật (Home, About, Login) -> Cho đi tiếp
        next(); 
    }
});


export default router




// code này để vinh chạy trên console để tạo nick ảo cho admin

// fetch('http://localhost:3000/register', { 
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         username: "user_test", // Đổi thành tên mới
//         password: "123",
//         fullName: "Test Account",
//         role: "admin" // Hoặc 'patient'
//     })
// })
// .then(res => res.json())
// .then(data => console.log("KẾT QUẢ ĐĂNG KÝ:", data))
// .catch(err => console.error("LỖI:", err));