<template>
  <div id = "teacherDetail">
      <div style="width:120px;height:160px;overflow:auto">
        <img v-if="form.image" :src="form.image" alt="获取图片失败">
        <img else >
      </div>
    <div style="flex:1">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item prop="tNumber" label="教师号：" >
              <span>{{form.tNumber}}</span>
          </el-form-item>  
          <el-form-item prop="name" label="姓名：">
              <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item prop="professionalTitle" label="职位：">
              <span>{{form.professionalTitle}}</span>
          </el-form-item>
          <el-form-item prop="adress" label="办公室：">
              <span>{{form.adress}}</span>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
              <span>{{form.email}}</span>
          </el-form-item>
          <el-form-item prop="phone" label="电话：">
              <span>{{form.phone}}</span>
          </el-form-item>
          <el-form-item prop="notes" label="介绍：">
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
import { getTeacherDetail } from 'api/api';
export default {
  data(){
      return{
          id: this.$route.params.id,
          form:{
            _id:this.$route.params.id,
            tNumber: '',
            name: '',
            professionalTitle: '',
            adress:'',
            email:'',
            phone: '',
            notes:''
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
      getTeacherDetail({id:that.id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.form = res.data.teacher;
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
#teacherDetail{
    display: flex
}
</style>
