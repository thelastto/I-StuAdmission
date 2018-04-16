<template>
  <div id = "aboutSCIEDetail">
    <div v-html="content"></div>
  </div>
</template>
<script>
import { getAboutSCIEDetail } from 'api/api';
export default {
  data(){
      return{
          id: this.$route.params.id,
          content:''
      }
  },
  mounted(){
      let that = this;
      getAboutSCIEDetail({id:that.id}).then(res => {
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
<style scoped>

</style>
