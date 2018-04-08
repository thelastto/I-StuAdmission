<template>
    <div  id='menu'>
        <div class="row1 clear">
            <div class="scielogo">
                <h1><a href="#">SCIE</a></h1>
            </div>  

            <div class="search">
                <form id="sitesearch">
                    <strong>Search:</strong>
                    <input type="text" value="Search…" onfocus="this.value=(this.value=='Search Our Website…')? '' : this.value ;">
                    <i :class="el-icon-search"></i>
                </form>
            </div>  
        </div>  
    
        <div class="row2">
            <ul v-for="item in menu">
                <li ><router-link :to='item.path'></router-link>{{item.cn}} </li>
            </ul>
        </div>
    </div>
</template>

<script>
import map from '../router/index.js'
export default {
    name:'headermenu',
    data() {
        return {
            menu: map
        }
    },
    methods: {
        
    },
    mounted(){
        console.log('menu'+this.menu[0])
    }
}
</script>

<style>
.scielogo{
    float: left;
}
.scielogo a{
    color: #FCFCFC;
    background-color: #06213F;
    outline: none;
    text-decoration: none;
}
.row1{
    height:100px;
    line-height:100px;
}
.search{
    float:right;
    line-height: 100px;
}
#sitesearch strong {
    display: block;
    float: left;
    margin: 0;
    padding: 7px 15px 0 0;
    text-transform: uppercase;
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
    height: 40px;
    line-height: 40px;
    border-radius:5px;
    background-color:white;
}
.rows li{
    display:line;
    padding:15px;
}

</style>


