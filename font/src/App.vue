<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/*各个浏览器统一*/
@import url(assets/css/hack.css);

 #app {
 	height: 100%;
 }
 li{
 outline: 0px!important;
 }
.el-pagination__editor {
    border: none;
}
.el-pager li.active {
    color: #fff;
}
.el-select-dropdown__item.selected {
    color: #fff;
}
.el-select .el-input .el-input__icon {
    margin-top: -50%;
}
.el-table .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
</style>
