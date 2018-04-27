<template>
  <div id="aboutSCIEDetail" class="components-container">
      
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config ref="ue" ></UE>
      </div>
      <div class="efloor">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="info" @click="back()">返回</el-button>
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
  import UE from 'components/UEditor.vue';
  import { updateAboutUS, getAboutUSDetail } from 'api/api';
  export default {
    components: {UE},
    data() {
      return {
        aboutUS_id:this.$route.params.id,
        defaultMsg: '',
        username: this.$store.getters.name,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    mounted(){
      let that = this;
      if(that.aboutUS_id){
        getAboutUSDetail({id:that.aboutUS_id}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.defaultMsg = res.data.content;
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
        let content = this.$refs.ue.getUEContent();
        updateAboutUS({id:that.aboutUS_id,name:'aboutSCIE',content:content,username:that.username}).then(res => {
          if (!res.data.code) {
            this.$message({type:'success',message:res.data.message})
            this.$router.push({name:'aboutSCIEList'});
          } else {
            this.$message({type:'error',message:res.data.message})
          }
        }).catch(err=>{
            this.$message({type:'error',message:err.message})
        })
        console.log(content)
      },
      back(){
        this.$router.go(-1);
      }
    }
  };
</script>