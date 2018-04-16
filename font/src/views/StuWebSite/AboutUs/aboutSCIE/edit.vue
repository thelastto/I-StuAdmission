<template>
  <div id="aboutSCIEDetail" class="components-container">
      
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config ref="ue" ></UE>
      </div>
      <div class="efloor">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="success" @click="apply()">应用</el-button>
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
  import { updateAboutSCIE, getAboutSCIE } from 'api/api';
  export default {
    components: {UE},
    data() {
      return {
        aboutSCIE_id:'',
        defaultMsg: '',
        username: this.$store.getters.name,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    methods: {
      save() {
        let that = this;
        let content = this.$refs.ue.getUEContent();
        updateAboutSCIE({id:that.aboutSCIE_id,name:'aboutSCIE',content:content,username:that.username}).then(res => {
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