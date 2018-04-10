<template>
    <div  id='menu'>
        <div class="row1 clear">
            <a href="#">SCIE</a>

            <div class="search">
                <form id="sitesearch">
                    <span>SEARCH:</span>
                    <input type="text" placeholder="keywords">
                    <span><i class="el-icon-search"></i></span>
                </form>
            </div>  
        </div>  
    
        <div class="row2">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#fff"
            text-color="#06213F" active-text-color="#55ABDA" router="true">
            <template v-for="item in menus" >
                <el-menu-item :index="item.path" :key='item.name' v-if='!item.children'>
                    {{item.cn}}
                </el-menu-item>
                <el-submenu :index="item.path" :key='item.name' v-if='item.children'>
                    <template slot="title">{{item.cn}}</template>
                    <template v-for='child in item.children' >                   
                        <el-menu-item :index="child.path" :key='child.name' >{{child.cn}} </el-menu-item>
                    </template>  
            </el-submenu>
            
            </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import map from '../router/index.js'
export default {
    name:'headermenu',
    data() {
        return {
            menus:[{
                path:'/',
                name:'home',
                cn:'HOME',
            }, {
                path:'/aboutus',
                name:'aboutus',
                cn:'ABOUT US',
                children: [{
                    path:'/aboutus/aboutSCIE',
                    name:'aboutSCIE',
                    cn:'ABOUT SCIE',
                },{
                    path:'/aboutus/contactUs',
                    name:'contactUs',
                    cn:'CONTACT US',
                }]
            },{
                path:'/education',
                name:'education',
                cn:'EDUCATION',
                children: [{
                    path:'/education/major',
                    name:'major',
                    cn:'MAJOR',
                },{
                    path:'/education/teacher',
                    name:'teacher',
                    cn:'TEACHER',
                }]
            },{
                path:'/news',
                name:'news',
                cn:'NEWS',
            }],
            activeIndex2: '1'
        }

    },
    methods: {
        
    },
}
</script>

<style>
#menu{
    margin-bottom: 20px;
}
.row1 a{
    font-size:36px;
    color: #FCFCFC;
    background-color: #06213F;
}
.row1{
    height:100px;
    line-height: 100px;
}
.search{
    float:right;
    line-height: 100px;
}
#sitesearch span {
    padding:10px;
    font-size:13px;
    color: #C6CDD6;
    background-color: #06213F;
}
.clear:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    line-height: 0;
}
.row2{
    border-radius:5px;
    background-color:white;
    overflow:auto
}

</style>


