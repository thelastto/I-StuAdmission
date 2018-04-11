<template>
  <div id="aboutSCIE" class="components-container">
    <div v-if="isEdit">
      
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config ref="ue" ></UE>
      </div>
      <div class="efloor">
        <el-button type="primary" @click="save()">提交更改</el-button>
        <el-button type="info" @click="backToPreView()">返回</el-button>
      </div>
    </div>
    <div v-else class="preview">
      <div class="ehead"><el-button plain @click="toEdit()">编辑</el-button></div>
      <div >
        <div v-html="defaultMsg"></div>
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
  import UE from 'components/UEditor.vue';
  import { updateAboutSCIE, getAboutSCIE } from 'api/api';
  export default {
    components: {UE},
    data() {
      return {
        isEdit: false,
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    mounted () {
      this.getData();
      
    },
    methods: {
      save() {
        let that = this;
        let content = this.$refs.ue.getUEContent();
        updateAboutSCIE({aboutSCIE:content}).then(res => {
          if (!res.data.code) {
            this.$message({type:'success',message:res.data.message})
            that.getData();
            that.isEdit = false;
          } else {
            this.$message({type:'error',message:res.data.message})
          }
        }).catch(err=>{
            this.$message({type:'error',message:err.message})
        })
        console.log(content)
      },
      getData(){
        var that = this;
        getAboutSCIE().then(res => {
          if (!res.data.code) {
            that.defaultMsg = res.data.aboutSCIE;
            that.isEdit = false;
          } else {
            this.$message({type:'error',message:res.data.message})
          }
        }).catch(err=>{
            this.$message({type:'error',message:err.message})
        })
      },
      toEdit() {
        this.isEdit=true;
      },
      backToPreView(){
        this.isEdit=false;
      }
    }
  };
</script>