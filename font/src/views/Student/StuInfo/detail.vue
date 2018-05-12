<template>
  <div id = "stuDetail">
    <div class="stuForm">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item prop="sNumber" label="学号：" >
              <span>{{form.sNumber}}</span>
          </el-form-item>  
          <el-form-item prop="name" label="姓名：">
              <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item prop="gender" label="性别：">
              <span>{{form.gender}}</span>
          </el-form-item>
          <el-form-item prop="major" label="专业：">
              <span>{{form.major}}</span>
          </el-form-item>
          <el-form-item prop="class" label="班级：">
              <span>{{form.class}}</span>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
              <span>{{form.email}}</span>
          </el-form-item>
          <el-form-item prop="phone" label="手机：">
              <span>{{form.phone}}</span>
          </el-form-item>
          <el-form-item prop="notes" label="备注：">
              <span>{{form.notes}}</span>
          </el-form-item>
        </el-form>
        <div class="floor">
        <el-button type="info" @click="back()">返回</el-button>
        </div>
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
              notes:'',
              gender:'',
              class:'',
              phone:''
          }
      }
  },
  methods: {
      back(){
        this.$router.go(-1);
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
