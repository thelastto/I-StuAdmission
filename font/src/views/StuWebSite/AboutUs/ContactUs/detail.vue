<template>
 <div>
    <div style="background:#fff;padding:20px">
      <div v-html="content"></div>
    </div>
    <div class="floor">
        <el-button type="info" @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
import { getAboutUSDetail } from 'api/api';
export default {
  data(){
      return{
          id: this.$route.params.id,
          content:''
      }
  },
  mounted(){
      let that = this;
      getAboutUSDetail({id:that.id}).then(res => {
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
  },
  methods: {
      back(){
        this.$router.go(-1);
      }
  }
}
</script>
<style scoped>

</style>
