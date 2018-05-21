<template>

    <div >
        
        <div style="margin-bottom:20px;"> 
          <el-tooltip content="添加一个新的教师信息" placement="top">
          <el-button type="primary" plain icon="el-icon-plus" 
            @click="handleAdd()">新建</el-button>
          </el-tooltip>
          <el-button  type="danger" plain icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>

          <el-form :inline="true"
                     :model="formInline"
                     class="form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.keywords"
                              placeholder="教师号/姓名/职位"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"
                               @click="getData()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <div class="feedback__container">
            <div class="feedback__table">
                <el-table :data="teacherList"
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
     
                    <el-table-column label="教师" min-width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="职位"
                                     min-width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.professionalTitle }}</span>
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
import { getTeacherList, removeTeacher, download , exportToExel,batchDeleteTeacher } from 'api/api';
import 'common/index';
export default {
    data() {
        return {
            dialogFormVisible: false,
            fileList: [],
            formInline: {
                keywords: ''
            },
            currentPage:1,
            loading: false,
            teacherList: [],
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
        getTeacherList({id:'',page:this.filtr.page, pageSize:this.filtr.pageSize,keywords:this.formInline.keywords}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.page.total = res.data.total;
            that.teacherList = res.data.teacherList;
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      },
      handleDetail(index, row) {
        this.$router.push({name:'teacherDetail',params:{id:row._id}}) 
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
          this.$router.push({name:'teacherEdit'}) 
      },
      handleUpdate(index,row){
          this.$router.push({name:'teacherEdit',params:{id:row._id}})
      },
      handleDelete(index, row) {
          let that = this;
          this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.loading = true;
                removeTeacher({ id: row._id }).then(res => {
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
      handleBatchDelete(){
          let that = this;
          this.$confirm('确定要删除所选教师吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                batchDeleteTeacher({teacherList:that.multipleSelection}).then(res =>{
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