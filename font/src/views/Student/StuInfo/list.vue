<template>

    <div >
        
        <div style="margin-bottom:20px;"> 
          <el-button type="primary" plain icon="el-icon-plus" 
            @click="handleAdd()">新建</el-button>
          <el-button  type="danger" plain icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
          <el-button type="success" plain icon="el-icon-document"  
              @click="dialogFormVisible = true">导入</el-button>

          <el-dialog title="导入" :visible.sync="dialogFormVisible">

            <el-upload class="upload-demo" ref="upload" :on-preview="handlePreview"
              action="/api/student/saveStuFromFile" multiple 
              :on-remove="handleRemove" :file-list="fileList" :auto-upload="false"
              :on-success="handleSuccess"
              accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">
                  注意事项：<br>
                  1.您上传的表格必须严格按照模板的格式填写，其中<span style="color:red">标红的为必填项</span><br>
                  2.不按照格式填写或没有填必填项会导致错误<br>
                  3.若您导入的学生已经存在，则会<span style="color:red">覆盖</span>其之前的资料，导入前请仔细核对<br>
                  4.若您还未下载模板，请先<a href="/api/download?filename=stuInfoTemplate">下载模板</a><br>
                  5.只能上传xlsx、xls格式的文件
              </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          

          <a href="/api/student/export" style="display:inline-block;padding-left:10px">
                <el-button type="success" plain icon="el-icon-document">导出</el-button>
          </a>

          <el-form :inline="true"
                     :model="formInline"
                     class="form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.keywords"
                              placeholder="学号/姓名/专业"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"
                               @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
            
        <div class="feedback__container">
            <div class="feedback__table">
                <el-table :data="stuList"
                          :v-loading="loading"
                          stripe
                          border
                          style="width: 100%"
                          :default-sort="{prop:'id'}"
                          @selection-change="changeFun">
                    <el-table-column type="selection"
                                     sortable
                                     @selection-change="changeFun">
                    </el-table-column>
                    <el-table-column label="学号"
                                     prop='id'
                                     min-width="120">
                        <template slot-scope="scope">
                            <el-icon name="id"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.sNumber }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名" min-width="300">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="专业"
                                     min-width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.major }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="邮箱"
                                     min-width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.email }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     min-width="200">
                        <template slot-scope="scope">
                            <el-button size="small" type="info" plain
                                       @click="handleDetail(scope.$index, scope.row)">查看</el-button>
                            <el-button size="small" type="primary" plain
                                       @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                            <el-button size="small" type="danger" plain
                                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
    
            </div>
        </div>
        <div class="footer">
                <el-pagination
                  @current-change="handleCurrentChange"
                  @size-change = "handleSizeChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="page.total">
                </el-pagination>
        </div>
        
    </div>
</template>
<script>
import { getStuList, removeStu, download , exportToExel,batchDeleteStu } from 'api/api';
import 'common/index';
export default {
    data() {
        return {
            dialogFormVisible: false,
            fileList: [],
            formInline: {
                name: '',
                keywords: '',
                daterange: ''
            },
            currentPage:1,
            loading: false,
            stuList: [],
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
                sizes: [10, 20, 30, 40],
            },
            multipleSelection:[]
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
      getData(){
        let that = this;
        let param = this.filtr;
        this.loading = true;
        getStuList({id:'',page:this.filtr.page, pageSize:this.filtr.pageSize,keywords:this.formInline.keywords}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.page.total = res.data.total;
            that.stuList = res.data.stuList;
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      },
      handleDetail(index, row) {
        this.$router.push({name:'stuDetail',params:{id:row._id}}) 
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
          this.$router.push({name:'stuEdit'}) 
      },
      handleUpdate(index,row){
          this.$router.push({name:'stuEdit',params:{id:row._id}})
      },
      handleDelete(index, row) {
          let that = this;
          this.$confirm('此操作将永久删除该留学生信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.loading = true;
                removeStu({ id: row._id }).then(res => {
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
      handleExport(){
          exportToExel().then(res => {
                    console.log(res)
                }).catch(() => {
                    console.log(res)
                   
            })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList){
          if(!response.code){
              this.$message({
                type: 'success',
                message: '导入成功!'
              });
              this.getData();
          }else{
              this.$message({
                type: 'error',
                duration:0,
                showClose:true,
                message: '数据'+JSON.stringify(response.err)+'错误，已停止导入'
              });
          }
      },
      handleBatchDelete(){
          let that = this;
          this.$confirm('确定要删除所选留学生吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                batchDeleteStu({stuList:that.multipleSelection}).then(res =>{
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
      },
      changeFun(val) {
        this.multipleSelection = val;
      },
    }
}
</script>
<style>
.el-dialog{
    margin: 0 0 0 0;
}
.form-inline{
    float:right;

}
.el-pagination{
    text-align: center
}
.footer{
    margin-top:20px;
}
.el-table th {
    background-color: #f5f7fa;
    text-align: left;
}
.el-table__header-wrapper thead div, .el-table__footer-wrapper thead div {
    background-color: #f5f7fa;
}
</style>