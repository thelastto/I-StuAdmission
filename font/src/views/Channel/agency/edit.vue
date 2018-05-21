<template>
  <div class="components-container">
      <div class="agencyForm">
        <el-form ref="form" :model="form" label-width="100px" size="mini">
          <el-form-item prop="name" label="中介名称" :rules="[{ 
              required: true, message: '请输入中介名称', trigger: 'blur' }]">
              <el-input v-model="form.name" v-if="!isEdit"></el-input>
              <el-input v-model="form.name" v-else disabled></el-input>
          </el-form-item>  
          <el-form-item prop="linkman" label="联系人" :rules="[{ 
              required: true, message: '请输入联系人', trigger: 'blur' }]">
              <el-input v-model="form.linkman"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="联系方式" :rules="[{ 
              required: true, message: '请输入联系方式', trigger: 'blur' }]">
              <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' 
              }]">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="notes" label="备注">
              <el-input type="textarea" v-model="form.notes"></el-input>
          </el-form-item>
        </el-form>
        <div class="floor">
        <el-button type="primary" @click="save('form')">保存</el-button>
        <el-button type="info" @click="back()">返回</el-button>
        </div>
      </div>
      
  </div>
      
  
</template>
<style>
  .agencyForm{
    width:500px;
    height:600px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left: -250px;
    margin-top: -250px;
  }
  .ehead{
    margin:20px;
    text-align:right;
  }
  .efloor{
    margin:20px;
    text-align: right;
  }
  .preview{
    margin:20px;
  }
</style>
<script>
  import { updateChannel, getChannelDetail } from 'api/api';
  export default {
    data() {
      return {
        isEdit: false,
        form: {
          category: 'agency',
          name: '',
          linkman: '',
          phone: '',
          email:'',
          notes:''

        },
        channel_id:this.$route.params.id,
      }
    },
    mounted(){
      let that = this;
      if(that.channel_id){
        getChannelDetail({id:that.channel_id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.form = res.data.channel;
            if(res.data.channel){
              that.isEdit = true;
            }
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      }
      
    },
    methods: {
      save(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateChannel({id:that.channel_id,channelform:that.form}).then(res => {
              if (!res.data.code) {
                this.$message({type:'success',message:res.data.message})
                this.$router.push({name:'agencyList'});
              } else {
                this.$message({type:'error',message:res.data.message})
              }
            }).catch(err=>{
                this.$message({type:'error',message:err.message})
            })
          }else{
              that.$message({type:'error',message:'请正确填写表格'})
              return false;
          }
        })
      },
      back(){
        this.$router.go(-1);
      }
    }
  };
</script>