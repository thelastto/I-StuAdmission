<template>
  <div id="app">
    <header-menu> </header-menu>
    <router-view></router-view>
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
 #app {
  height: 100%;
  width:960px;
  margin:auto;
  background: #07223e;
 }
 li{
  outline: 0px!important;
  margin: 0;
  padding: 0;
  list-style: none;
 }
    
</style>
