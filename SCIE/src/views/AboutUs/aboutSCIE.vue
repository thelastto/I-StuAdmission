<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>
<script>
import { getAboutUsPage } from 'api/api.js';
export default {
  data(){
      return{
          content:''
      }
  },
  mounted(){
      let that = this;
      getAboutUsPage({name:'aboutSCIE'}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.content = res.data.content;
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
<style >

</style>
