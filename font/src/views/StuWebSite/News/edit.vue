<template>
  <div class="components-container">
      <div>

        <el-form ref="newsForm" :model="newsForm" label-width="80px" size="mini">
          <el-form-item prop="title" label="标题" :rules="[{ 
              required: true, message: '请输入新闻标题', trigger: 'blur' 
              }]">
              <el-input v-model="newsForm.title"></el-input>
          </el-form-item>  
          <el-form-item prop="name" label="图片">
              <el-upload class="upload-demo"
              :before-upload="beforeAvatarUpload"
              :limit = "1"
              action="/api/upload?type=news"
              :on-success="handleSuccess"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="轮播">
              <el-switch v-model="newsForm.slide"></el-switch>
          </el-form-item>
          <el-form-item prop="content" label="内容" >
              <div class="editor-container">
                <UE :defaultMsg=newsForm.content :config=config ref="ue" ></UE>
              </div>
          </el-form-item>

        </el-form>
        <div class="floor">
        <el-button type="primary" @click="save('newsForm')">保存</el-button>
        <el-button type="info" @click="back()">返回</el-button>
        </div>
      </div>
      
  </div>
      
  
</template>
<style>
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
  .newsForm .el-select .el-input .el-input__icon {
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
  import UE from 'components/UEditor.vue';
  import { updateNews, getNewsDetail } from 'api/api';
  export default {
    components: {UE},
    data() {
      return {
        isEdit: false,
        imageUrl: '',
        newsForm: {
          _id:this.$route.params.id,
          title:'',
          image:'',
          content:'',
          slide:false
        },
        fileList2: [],
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 500
        },
        news_id:this.$route.params.id,
      }
    },
    mounted(){
      let that = this;
      if(that.news_id){
        getNewsDetail({id:that.news_id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.newsForm = res.data.news;
            that.fileList2 = [{name:that.newsForm.image.substring(that.newsForm.image.lastIndexOf("\/")+1),url:that.newsForm.image}]
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
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('图片只能是JPG或PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      save(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.newsForm.content = that.$refs.ue.getUEContent();
            updateNews({id:that.news_id,newsform:that.newsForm}).then(res => {
              if (!res.data.code) {
                that.$message({type:'success',message:res.data.message})
                that.$router.push({name:'newsList'});
              } else {
                that.$message({type:'error',message:res.data.message})
                that.$router.push({name:'newsEdit'});
              }
            })
          }else{
              that.$message({type:'error',message:'请正确填写表格'})
              return false;
          }
        })
      },
      handleSuccess(response, file, fileList){
          if(!response.code){
            this.newsForm.image=response.url
              this.$message({
                type: 'success',
                message: response.message
              });
          }else{
              this.$message({
                type: 'error',
                duration:0,
                showClose:true,
                message: response.message
              });
          }
      },
      back(){
        this.$router.go(-1);
      }
    }
  };
</script>