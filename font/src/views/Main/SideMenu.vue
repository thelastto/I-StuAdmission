<template  id='sideMenu'>
    <div>
        <template v-for="item in routes[0].children" >
            <el-submenu :index="item.path"  :key='item.name' v-if='item.children&&item.children[0].cn'>
                <template slot="title"> <i :class="item.icon"></i>{{item.cn}}</template>
                <template v-for='child in item.children' >
                    <el-submenu :index="child.path" :key='child.name' v-if='child.children&&child.children[0].cn'>
                        <template slot="title"><i ></i>{{child.cn}}</template>
                        <template v-for='child in child.children' >
                            <el-menu-item :index="child.path" :key='child.name' >{{child.cn}}</el-menu-item>
                        </template>
                    </el-submenu>                    
                    <el-menu-item :index="child.path" :key='child.name' v-else><i></i><span slot="title">{{child.cn}}</span> </el-menu-item>
                    
                </template>  
            </el-submenu>
            <el-menu-item :index="item.path"  :key='item.name' v-else><i :class="item.icon"></i><span slot="title">{{item.cn}}</span> </el-menu-item>
            
        </template>
    </div> 
</template>
<script>
export default {
    name: 'sideMenu',
    props: {
        routes: {
            type: Array
        }
    },
    data() {
        return {
         
        }

    },
    mounted(){
        console.log('sdfs',this.routes[0])
    }
}
</script>
<style>

</style>


