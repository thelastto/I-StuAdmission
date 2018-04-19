<template>
  <div id = "stuDetail">
    <div style="width:500px;">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item prop="sNumber" label="学号" >
              <el-input v-model="form.sNumber" :disabled="true"></el-input>
          </el-form-item>  
          <el-form-item prop="name" label="姓名">
              <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="major" label="专业">
              <el-input v-model="form.major" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
              <el-input v-model="form.email" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="notes" label="备注">
              <el-input type="textarea" v-model="form.notes" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { getStuDetail } from 'api/api';
export default {
  data(){
      return{
          id: this.$route.params.id,
          form:{
              sNumber:'',
              name:'',
              major:'',
              email:'',
              notes:''
          }
      }
  },
  mounted(){
      let that = this;
      getStuDetail({id:that.id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.form = res.data.stu;
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
      })
  }
}
</script>
<style scoped>

</style>
