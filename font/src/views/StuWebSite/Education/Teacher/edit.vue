<template>
  <div class="components-container">
      <div class="teacherForm">

        <el-form ref="teacherForm" :model="teacherForm" label-width="80px" size="mini">
          <el-form-item prop="tNumber" label="教师号" :rules="[{ 
              required: true, message: '请输入教师号', trigger: 'blur' 
              }]">
              <el-input v-model="teacherForm.tNumber" v-if="!isEdit"></el-input>
              <el-input v-model="teacherForm.tNumber" v-else disabled></el-input>
          </el-form-item>  
          <el-form-item prop="name" label="姓名" :rules="[{ 
              required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="teacherForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="professionalTitle" label="职称" >
              <el-input v-model="teacherForm.professionalTitle"></el-input>
          </el-form-item>
          <el-form-item prop="adress" label="地址" >
              <el-input v-model="teacherForm.adress"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' 
              }]">
              <el-input v-model="teacherForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机" :rules="[{ min:11, max:11, message: '请输入11位手机号', trigger: 'blur,change' 
              }]">
              <el-input v-model="teacherForm.phone"></el-input>
          </el-form-item>  
          <el-form-item prop="notes" label="备注">
              <el-input type="textarea" v-model="teacherForm.notes"></el-input>
          </el-form-item>

        </el-form>
        <div class="floor">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="info" @click="back()">返回</el-button>
        </div>
      </div>
      
  </div>
      
  
</template>
<style>
  .teacherForm{
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
  .teacherForm .el-select .el-input .el-input__icon {
    top: 0;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  import { updateTeacher, getTeacherDetail } from 'api/api';
  export default {
    data() {
      return {
        isEdit: false,
        imageUrl: '',
        teacherForm: {
          _id:this.$route.params.id,
          tNumber: '',
          name: '',
          professionalTitle: '',
          adress:'',
          email:'',
          phone: '',
          notes:''

        },
        teacher_id:this.$route.params.id,
      }
    },
    mounted(){
      let that = this;
      if(that.teacher_id){
        getTeacherDetail({id:that.teacher_id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.teacherForm = res.data.teacher;
            if(res.data.teacher){
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
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      save() {
        let that = this;
        updateTeacher({id:that.teacher_id,teacherform:that.teacherForm}).then(res => {
          if (!res.data.code) {
            that.$message({type:'success',message:res.data.message})
            that.$router.push({name:'teacherList'});
          } else {
            that.$message({type:'error',message:res.data.message})
            that.$router.push({name:'teacherEdit'});
          }
        })
      },
      back(){
        this.$router.go(-1);
      }
    }
  };
</script>