<template>
    <div class="full-screen-wrapper">
        
        <div class="ui container content-area">
            
            <div class="ui raised very padded segment info-box">
                <h2 class="ui header blue center aligned">
                    <i class="info circle icon"></i>
                    <div class="content">
                        About Project
                        <div class="sub header">Hospital Management System</div>
                    </div>
                </h2>
                
                <div class="ui divider"></div>

                <div class="ui grid stackable">
                    <div class="ten wide column">
                         <p style="font-size: 1.1em; text-align: justify;">
                            Thisweb application streamlines hospital operations, allowing administrators to manage patient records efficiently with high data accuracy and security.
                        </p>
                        
                        <h4 class="ui header"><i class="code icon"></i> Tech Stack</h4>
                        <div class="ui horizontal list">
                            <div class="item">
                                <i class="vuejs icon green"></i> Vue.js
                            </div>
                            <div class="item">
                                <i class="node js icon green"></i> Node.js
                            </div>
                            <div class="item">
                                <i class="database icon green"></i> MongoDB
                            </div>
                        </div>
                    </div>

                    <div class="six wide column center aligned middle aligned">
                         <div class="ui card centered" style="width: 100%">
                            <div class="content">
                                <div class="header" style="font-size: 1rem;">Developed by</div>
                                <div class="description">
                                    <strong>Vu The Vinh</strong>
                                </div>
                            </div>
                            <div class="extra content">
                                <a href="https://github.com/vuthevinh2125" target="_blank">
                                    <i class="github icon"></i> vuthevinh2125
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
/* 1. Xử lý Full màn hình */
.full-screen-wrapper {
    position: fixed;
    
    /* --- SỬA ĐOẠN NÀY --- */
    top: 60px; /* Đẩy xuống 45px (bằng chiều cao thanh menu) */
    height: calc(100vh - 60px); /* Chiều cao = Toàn màn hình trừ đi 45px */
    z-index: 0; /* Hạ thấp xuống để không đè lên menu hoặc các popup */
    /* -------------------- */

    left: 0;
    width: 100vw;
    
    /* Ảnh nền */
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), 
                      url('https://wallpaperaccess.com/full/1282835.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    /* 2. Căn chỉnh nội dung xuống dưới cùng */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    
    padding-bottom: 40px;
}

/* Các đoạn khác giữ nguyên */
.info-box {
    background-color: rgba(255, 255, 255, 0.95) !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important;
    max-width: 900px;
    margin: 0 auto;
}

@media only screen and (max-width: 767px) {
    .full-screen-wrapper {
        padding-bottom: 20px;
        position: relative;
        /* Mobile thì trả về bình thường */
        top: 0; 
        height: auto;
        min-height: 100vh;
    }
}
</style>