<template>
  <div id = "agencyDetail">
    <div class="agencyForm">
        <el-form ref="form" :model="form" label-width="100px" size="mini">
          <el-form-item prop="name" label="人员姓名：">
              <span>{{form.name}}</span>
          </el-form-item>
          <!-- <el-form-item prop="linkman" label="联系人">
              <span>{{form.linkman}}</span>
          </el-form-item> -->
          <el-form-item prop="phone" label="联系方式：">
              <span>{{form.phone}}</span>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
              <span>{{form.email}}</span>
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
import { getChannelDetail } from 'api/api';
export default {
  data(){
      return{
          id: this.$route.params.id,
          form:{
              name:'',
            //   linkman:'',
              phone:'',
              email:'',
              notes:'',
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
      getChannelDetail({id:that.id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.form = res.data.channel;
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
