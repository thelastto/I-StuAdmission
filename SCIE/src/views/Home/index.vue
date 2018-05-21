<template>
  <div class="home">
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in newsList" :key="item" v-if="item.slide">
          <router-link :to="{ name: 'newsDetail', params: { id: item._id }}">
            <img :src = "item.image" width="960">
          </router-link>
        </el-carousel-item>

      </el-carousel>
      <table cellspacing="0" style="width:100%;border-collapse:collapse;">
        <tbody >
          <tr v-for="item in newsList" :key="item">
          <td class="newsItem" align="left" valign="top">
            <li style="width:70%;"><router-link :to="{ name: 'newsDetail', params: { id: item._id }}">{{item.title}}</router-link></li>
            <li style="text-align: right;flex:1;">{{item.lastEditDate}}</li>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
</template>
<script>
  import { getNewsList } from 'api/api';
  import {dateFormat} from 'utils/DateFormat'
  export default {
    data() {
        return {
            currentPage:1,
            loading: false,
            newsList: [],
            
        }
    },
    mounted () {
      this.getData();
    },
    methods: {
      getData(){
        let that = this;
        let param = this.filtr;
        this.loading = true;
        getNewsList({page:1, pageSize:10}).then(res => {
          if (!res.data.code) {
            that.newsList = res.data.newsList;
            for(let i = 0; i < that.newsList.length; i++){
                that.newsList[i].lastEditDate =  dateFormat(that.newsList[i].lastEditDate);
            }
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      }

    }
  };
</script>
<style>
  .home{
    background: #09233d
  }
  .home>div{
    background: #fff;
    border-radius:5px
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

.newsItem{
    display: flex;
    width: 100%;
    float: left;
    border-bottom: 1px solid rgb(204,204,204);
}
.newsItem li{
    display: block;
    height: 40px;
    float: left;
    line-height: 40px;
    font-size:14px;
    padding-left:30px;
    padding-right:30px
}

</style>
