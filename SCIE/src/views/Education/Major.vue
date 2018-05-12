<template>
  <div  class="components-container">
   
    <div style="width:100%;overflow:hidden;">
        <el-table :data="majors" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="introduction:">
                            <span>{{ props.row.detail}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            
            <el-table-column label="Majors" prop="name" min-width="300"> 

            </el-table-column>
            
        </el-table>
    
    </div>

    <div class="pagination">
            <div class="block">
                <el-pagination
      :current-page="currentPage"
      :page-sizes="[10,20,30,40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
            </div>
        </div>
  </div>
  
</template>
<style>
  .pagination{
      margin:20px auto;
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
        getMajorList({page:this.filtr.page, pageSize:this.filtr.pageSize}).then(res => {
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