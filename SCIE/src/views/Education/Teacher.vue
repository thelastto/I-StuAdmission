<template>
  <div  class="components-container">
      <el-row>
          <el-col :span="8" v-for="(teacher, index) in teachers" :key="teacher" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px',display:'flex' }">
                  <img :src="teacher.image" class="image">
                  <div style="margin:10px 20px">
                      <p v-if="teacher.name">姓名：{{teacher.name}}</p>
                      <p v-if="teacher.professionalTitle">职位：{{teacher.professionalTitle}}</p>
                      <p v-if="teacher.address">办公室：{{teacher.address}}</p>
                      <p v-if="teacher.email">邮箱：{{teacher.email}}</p>
                      <p v-if="teacher.phone">电话：{{teacher.phone}}</p>
                  </div>
              </el-card>
          </el-col>
      </el-row>
      <div class="pagination">
         <div class="block">
             <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
             :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next"
             :total="page.total">
             </el-pagination>
          </div>
      </div>
  </div>
</template>
<style>
 .components-container{
     padding: 20px 0
 }

  .el-pagination{
    text-align: center
  }
  .image {
    width: 120px;
    height:160px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .el-row{
      display:flex;
      flex-wrap: wrap;
  }
  .el-row>.el-col{
      width:280px;
      margin-left:30px;
      margin-bottom:10px
  }
</style>

<script>
  import { getTeacherList } from 'api/api';
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
            teachers: [],
            filtr: {
                name: '',
                kyw: '',
                page: 1,
                pageSize: 9
            },
            page: {
                total: 0,
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
        getTeacherList({page:this.filtr.page, pageSize:9}).then(res => {
          if (!res.data.code) {
            that.page.total = res.data.total;
            that.teachers = res.data.teacherList;
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
