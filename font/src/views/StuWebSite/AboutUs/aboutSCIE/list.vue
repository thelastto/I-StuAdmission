<template>
  <div id="aboutSCIE" class="components-container">
    <div style="margin-bottom:20px;"> 
         <el-button type="primary" plain icon="el-icon-plus" 
           @click="handleAdd()">新建</el-button>
        <el-button  type="danger" plain icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
    </div>

    <div style="width:100%;overflow:hidden;">
        <el-table :data="aboutSCIEs" :v-loading="loading"
           stripe border style="width: 100%;"
          :default-sort="{prop:'id'}"
          @selection-change="changeFun">
            <el-table-column type="selection" @selection-change="changeFun">
            </el-table-column>
            <el-table-column label="内容" prop='scope' min-width="250">
                <template slot-scope="scope">
                    <span style="padding-left: 10px">{{ scope.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建者" min-width="80">
                <template slot-scope="scope">
                    <span style="padding-left: 10px">{{ scope.row.createBy }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" min-width="180">
                <template slot-scope="scope">
                    <span style="padding-left: 10px">{{ scope.row.createDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="最后修改" min-width="80">
                <template slot-scope="scope">
                    <span style="padding-left: 10px">{{ scope.row.lastEditBy }}</span>
                </template>
            </el-table-column>
            <el-table-column label="最后修改时间" min-width="180">
                <template slot-scope="scope">
                    <span style="padding-left: 10px">{{ scope.row.lastEditDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="300">
                <template slot-scope="scope">
                    <el-button size="small" type="info" plain 
                        @click="handleDetail(scope.$index, scope.row)">查看</el-button>
                    <el-button size="small" type="primary" plain
                        @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger" plain v-if = "!scope.row.isApply"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    
                    <el-button size="small" type="success" plain v-if = "!scope.row.isApply"
                        @click="handleApply(scope.$index, scope.row)">应用</el-button>
                    <el-tooltip class="item" effect="dark" content="正在应用，不可删除" placement="top" v-else >
                      <el-button type="success" size="small"
                        icon="el-icon-success">正在应用</el-button>
                    </el-tooltip>
                </template>
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
  import { getAboutUS,removeAboutUS,applyAboutUS, batchDeleteAboutUS } from 'api/api';
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
            aboutSCIEs: [],
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
            multipleSelection:[]
        }
    },
    mounted () {
      this.getData();
    },
    methods: {
      changeFun(val) {
        this.multipleSelection = val;
      },
      getData(){
        let that = this;
        let param = this.filtr;
        this.loading = true;
        console.log(this.filtr.page)
        console.log(this.filtr.pageSize);
        getAboutUS({name:'aboutSCIE',page:this.filtr.page, pageSize:this.filtr.pageSize}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.page.total = res.data.total;
            that.aboutSCIEs = res.data.aboutUSList;
            for(let i = 0; i < that.aboutSCIEs.length; i++){
                that.aboutSCIEs[i].createDate =  dateFormat(that.aboutSCIEs[i].createDate);
                that.aboutSCIEs[i].lastEditDate =  dateFormat(that.aboutSCIEs[i].lastEditDate);
                that.aboutSCIEs[i].content = that.aboutSCIEs[i].content.replace(/<[^>]+>/g,"");  
            }
            console.log(res.data);
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      },
      handleDetail(index, row) {
        this.$router.push({name:'aboutSCIEDetail',params:{id:row._id}}) 
      },
      handleCurrentChange(val){
          this.filtr.page = val;
          this.getData();
      },
      handleSizeChange(val){
          this.filtr.pageSize = val;
          this.getData();   
      },
      handleAdd(){
          this.$router.push({name:'aboutSCIEEdit'}) 
      },
      handleUpdate(index,row){
          this.$router.push({name:'aboutSCIEEdit',params:{id:row._id}})
      },
      handleDelete(index, row) {
          let that = this;
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.loading = true;
                removeAboutUS({ id: row._id }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    that.getData()
                    that.loading = false
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    });
                })
            });
      },
      handleApply(index, row) {
          let that = this;
          this.$confirm('该文件将应用于留学生网站', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.loading = true;
                applyAboutUS({ id: row._id }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    });
                    that.getData()
                    that.loading = false
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                })
            });
      },
      handleBatchDelete(){
          let that = this;
          this.$confirm('确定要删除所选内容吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                batchDeleteAboutUS({aboutUSList:that.multipleSelection}).then(res =>{
                    if(!res.code){
                        that.$message({
                          type: 'success',
                          message: '删除成功'
                        })
                        that.getData();
                    }else{
                        that.$message({
                          type: 'error',
                          message: res.message
                        });
                    }
              
                })
            })
      }
    }
  };
</script>