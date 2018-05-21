<template>

    <div >
        
        <div style="margin-bottom:20px;"> 
          <el-tooltip content="添加一个新的中介" placement="top">
          <el-button type="primary" plain icon="el-icon-plus" 
            @click="handleAdd()">新建</el-button>
          </el-tooltip>
          <el-button  type="danger" plain icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>

          <el-form :inline="true"
                     :model="formInline"
                     class="form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.keywords"
                              placeholder="名称/联系人"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"
                               @click="getData()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
            
        <div class="feedback__container">
            <div class="feedback__table">
                <el-table :data="channelList"
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
                    <el-table-column label="名称"
                                     prop='id'
                                     min-width="200">
                        <template slot-scope="scope">
                            <el-icon name="id"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系人" min-width="150">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.linkman}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系方式"
                                     min-width="150">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
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
import { getChannelList, removeChannel, download , exportToExel,batchDeleteChannel } from 'api/api';
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
            channelList: [],
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
        getChannelList({category:'agency',page:this.filtr.page, pageSize:this.filtr.pageSize,keywords:this.formInline.keywords}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.page.total = res.data.total;
            that.channelList = res.data.channelList;
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      },
      handleDetail(index, row) {
        this.$router.push({name:'agencyDetail',params:{id:row._id}}) 
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
          this.$router.push({name:'agencyEdit'}) 
      },
      handleUpdate(index,row){
          this.$router.push({name:'agencyEdit',params:{id:row._id}})
      },
      handleDelete(index, row) {
          let that = this;
          this.$confirm('此操作将永久删除该中介, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.loading = true;
                removeChannel({ id: row._id }).then(res => {
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
          this.$confirm('确定要删除所选中介吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                batchDeleteChannel({channelList:that.multipleSelection}).then(res =>{
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
.footer{
    margin-top:20px;
}
</style>