<template>
  <div class="components-container">
      <div class="stuForm">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item prop="sNumber" label="学号" :rules="[{ 
              required: true, message: '请输入学号', trigger: 'blur' 
              },{ min:10, max:10, message: '请输入10位学号', trigger: 'blur,change' 
              }]">
              <el-input v-model="form.sNumber" v-if="!isEdit"></el-input>
              <el-input v-model="form.sNumber" v-else disabled></el-input>
          </el-form-item>  
          <el-form-item prop="name" label="姓名" :rules="[{ 
              required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="major" label="专业" :rules="[{ 
              required: true, message: '请输入专业', trigger: 'blur' }]">
              <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item prop="class" label="班级" >
              <el-input v-model="form.class"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机">
              <el-input v-model="form.phone"></el-input>
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
  .stuForm{
    width:500px;
    height:600px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left: -250px;
    margin-top: -250px;
  }
  .floor{
    margin:20px;
    text-align: center;
  }
  .preview{
    margin:20px;
  }
  .el-select{
    width:100%;
  }
  .stuForm .el-select .el-input .el-input__icon {
    top: 0;
}
</style>
<script>
  import { updateStu, getStuDetail } from 'api/api';
  export default {
    data() {
      return {
        isEdit: false,
        form: {
          sNumber: '',
          name: '',
          major: '',
          class:'',
          email:'',
          phone: '',
          gender:'',
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
            if(res.data.stu){
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
            updateStu({id:that.stu_id,stuform:that.form}).then(res => {
              if (!res.data.code) {
                that.$message({type:'success',message:res.data.message})
                that.$router.push({name:'stuList'});
              } else {
                that.$message({type:'error',message:res.data.message})
                that.$router.push({name:'stuEdit'});
              }
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