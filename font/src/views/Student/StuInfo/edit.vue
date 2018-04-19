<template>
  <div class="components-container">
      <div style="width:500px;">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item prop="sNumber" label="学号" :rules="[{ 
              required: true, message: '请输入学号', trigger: 'blur' 
              },{ min:10, max:10, message: '请输入10位数学号', trigger: 'blur,change' 
              }]">
              <el-input v-model="form.sNumber"></el-input>
          </el-form-item>  
          <el-form-item prop="name" label="姓名" :rules="[{ 
              required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="major" label="专业" :rules="[{ 
              required: true, message: '请输入专业', trigger: 'blur' }]">
              <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :rules="[{ 
              required: true, message: '请输入邮箱地址', trigger: 'blur' 
              },{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' 
              }]">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="notes" label="备注">
              <el-input type="textarea" v-model="form.notes"></el-input>
          </el-form-item>
        </el-form>
        <div class="efloor">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="info" @click="back()">返回</el-button>
        </div>
      </div>
      
  </div>
      
  
</template>
<style>

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
  import { updateStu, getStuDetail } from 'api/api';
  export default {
    data() {
      return {
        form: {
          sNumber: '',
          name: '',
          major: '',
          email:'',
          notes:''

        },
        stu_id:this.$route.params.id,
      }
    },
    mounted(){
      let that = this;
      if(that.stu_id){
        getStuDetail({id:that.stu_id}).then(res => {
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
      
    },
    methods: {
      save() {
        let that = this;
        updateStu({id:that.stu_id,stuform:that.form}).then(res => {
          if (!res.data.code) {
            this.$message({type:'success',message:res.data.message})
            this.$router.push({name:'stuList'});
          } else {
            this.$message({type:'error',message:res.data.message})
          }
        }).catch(err=>{
            this.$message({type:'error',message:err.message})
        })
      },
      back(){
        this.$router.go(-1);
      }
    }
  };
</script>