<template>
  <div class="news">
    <div>
      <table cellspacing="0" style="width:100%;border-collapse:collapse;">
        <tbody>
          <tr  v-for="item in newsList" :key="item">
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
            formInline: {
                name: '',
                keywords: '',
                daterange: ''
            },
            currentPage:1,
            loading: false,
            newsList: [],
            filtr: {
                name: '',
                kyw: '',
                bdate: '',
                edate: '',
                page: 1,
                pageSize: 10
            },
            page: {
                total: 0,
                sizes: [15, 20, 25, 30],
            },
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
        getNewsList({page:this.filtr.page, pageSize:this.filtr.pageSize}).then(res => {
          if (!res.data.code) {
            that.page.total = res.data.total;
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
      },
      handleCurrentChange(val){
          this.filtr.page = val;
          this.getData();
      },
      handleSizeChange(val){
          this.filtr.pageSize = val;
          this.getData();   
      },

    }
  };
</script>
<style>


.newsItem{
    display: flex;
    width: 100%;
    float: left;
    border-bottom: 1px solid rgb(204,204,204);
}
tr:last-child .newsItem{
  border-bottom: none
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
