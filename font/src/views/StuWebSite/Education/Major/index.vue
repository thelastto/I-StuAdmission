<template>
  <div  class="components-container">
    <div style="margin-bottom:20px;"> 
         <el-button type="primary" plain icon="el-icon-plus" 
            @click="dialogFormVisible = true">新建</el-button>
    </div>

    <el-dialog title="添加一个专业" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="专业名称">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  label="专业介绍">
              <el-input type="textarea" v-model="form.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">保 存</el-button>
      </div>
    </el-dialog>
     <el-dialog title="修改专业" :visible.sync="dialogUpdateVisible">
      <el-form :model="updateForm">
        <el-form-item label="专业名称" >
          <el-input v-model="updateForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  label="专业介绍">
              <el-input type="textarea" v-model="updateForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate()">修 改</el-button>
      </div>
    </el-dialog>

    <div style="width:100%;overflow:hidden;">
        <el-table :data="majors" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="专业简介">
                            <span>{{ props.row.detail}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            
            <el-table-column label="专业" prop="name" min-width="300"> 

            </el-table-column>
            
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" plain
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="primary" plain
                                       @click="openUpdate(scope.$index, scope.row)">修改</el-button>
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
  import { getMajorList,removeMajor, addMajor, updateMajor } from 'api/api';
  export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogUpdateVisible :false,
            form:{
              name: '',
              detail: ''
            },
            updateForm:{},
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
            multipleSelection:[]
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
      handleAdd(){
        let that = this;
          addMajor({name:that.form.name,detail:that.form.detail}).then(res => {
          if (!res.data.code) {
            that.$message({type:'success',message:res.data.message})
          } else {
            that.$message({type:'error',message:res.data.message})
          }
        })
      },
      openUpdate(index,row){
        this.updateForm = row;
        this.dialogUpdateVisible = true;
      },
      
      handleUpdate(index,row){
          let that = this;
          updateMajor({majorForm:that.updateForm}).then(res => {
          if (!res.data.code) {
            that.$message({type:'success',message:res.data.message})
          } else {
            that.$message({type:'error',message:res.data.message})
          }
        })
      },
      handleDelete(index, row) {
          let that = this;
          this.$confirm('此操作将永久删除该专业信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.loading = true;
                removeMajor({ id: row._id }).then(res => {
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
    }
  };
</script>