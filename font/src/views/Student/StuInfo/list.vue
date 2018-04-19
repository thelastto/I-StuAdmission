<template>
    <div >
        <div style="margin-bottom:20px;"> 
          <el-tooltip content="添加一个新的学生信息" placement="top">
          <el-button type="primary" plain icon="el-icon-plus" 
            @click="handleAdd()">新建</el-button>
          </el-tooltip>
          <el-tooltip content="从本地exel导入" placement="top">
            <el-button type="success" plain icon="el-icon-document" >导入</el-button>
          </el-tooltip>
          <el-tooltip content="导出到本地" placement="top">
            <el-button type="success" plain icon="el-icon-share" >导出</el-button>
          </el-tooltip>
          
          <el-button  type="danger" plain icon="el-icon-delete" >批量删除</el-button>

          <el-form :inline="true"
                     :model="formInline"
                     class="form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.keywords"
                              placeholder="请输入关键词"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
            
        <div class="feedback__container">
            <div class="feedback__table">
                <el-table :data="stuList"
                          :v-loading="loading"
                          height="641"
                          stripe
                          border
                          style="width: 100%"
                          :default-sort="{prop:'id',order:'descending'}">
                    <el-table-column type="selection"
                                     sortable
                                    >
                    </el-table-column>
                    <el-table-column label="学号"
                                     prop='id'
                                     min-width="100">
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
        <div class="feedback__pagination">
            <div class="block">
                <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getStuList, removeStu } from 'api/api';
import 'common/index';
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
                sizes: [15, 20, 25, 30],
            }
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
        getStuList({id:'',page:this.filtr.page, pageSize:this.filtr.pageSize}).then(res => {
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
      }
    }
}
</script>
<style lang="scss" scoped>
.form-inline{
    float:right;

}
.feedback {
    &__pagination {
        padding-top: 30px;
        width: 800px;
        margin: 0 auto;
    }
}
</style>