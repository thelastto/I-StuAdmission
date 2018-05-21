<template>
  <div  class="major-container">
   
    <el-collapse >
      <el-collapse-item  v-for="major in majors" :title="major.name" :key="major">
        <div>{{major.detail}}</div>
      </el-collapse-item>
    </el-collapse>

    <div class="pagination">
            <div class="block">
              <el-pagination @current-change="handleCurrentChange"
             :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next"
             :total="page.total">
              </el-pagination>
            </div>
        </div>
  </div>
  
</template>
<style>
.major-container{
  padding: 0 20px
}
  .pagination{
      padding:20px;
  }
  .el-pagination{
    text-align: center
  }
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
  .el-table .sort-caret.descending {
    bottom: 5px;
  }
  .el-table .sort-caret.ascending {
    top: 9px;
    border-top: none;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgb(151, 168, 190);
    border-left: 5px solid transparent;
  }
  .el-table .sort-caret {
    color: #b4bccc;
    overflow: hidden;
    font-size: 15px;
    width: 0;
    position: absolute;
    left: 4px;
  }
</style>
<script>
  import { getMajorList } from 'api/api';
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
            majors: [],
            filtr: {
                name: '',
                kyw: '',
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
        getMajorList({page:this.filtr.page, pageSize:10}).then(res => {
          if (!res.data.code) {
            that.page.total = res.data.total;
            that.majors = res.data.majorList;
            console.log(res.data);
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