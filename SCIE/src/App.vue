<template>
  <div id="app">
    <header-menu> </header-menu>
    <div class="container">
      <router-view></router-view>
    </div>
    
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
   width:100%;
   min-height:1000px;
   height:auto;
   color:#979797;
   border-radius:5px;
   background: #fff
 }
</style>
