<template>
  <div id="app">
    <header-menu> </header-menu>
    <div class="container">
      <router-view></router-view>
    </div>
    <div id="footer">
        <div ><img src="./assets/zjgsu.png" alt=""></div>
        <div class="address">
          <div>
            <p>Address: No.18, Xuezheng Str., Zhejiang Gongshang University, Xiasha University Town, Hangzhou, China. 310018</p>
          </div>
          <div>
            <p>Tel: (86)0571-28008316</p>
            <p>E-mail: scie@zjgsu.edu.cn</p>
          </div>
          <div>
            <p>Copyright @ 1997-2018 Zhejiang Gongshang University</p>
          </div>
          <div>
            <p>浙公网安备 33011802000512号</p>
          </div>
          
        </div>
      </div>
      
      <!-- ####################################################################################################### -->
    </div>
</template>

<script>
import HeaderMenu from './components/menu.vue';
export default {
  name: 'app',
  components:{HeaderMenu}
  
}
</script>

<style>
/*各个浏览器统一*/
@import url(assets/css/hack.css);
 *{
   margin: 0;
   padding: 0;
 }
 body{
  background: #07223e;
 }
 #app {
  height: 100%;
  width:960px;
  margin:auto;
 }
 li{
  outline: 0px!important;
  list-style: none;
 }
 a{
    text-decoration: none;
    font-size: 13px
 } 
 .container{
   width:960px;
   height:auto;
   color:#979797;
   border-radius:5px;
   background: #fff;
 }
 #footer {
    width: 960px;
    margin-top:20px;
    display:flex;
    align-items:center;
    background: #fff;
    border-radius: 5px;
    color:#979797;

 }
 .address>div{
   padding-top: 10px
  }
</style>
