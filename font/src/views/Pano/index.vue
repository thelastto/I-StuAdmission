<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="选择留学生" name="first">
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
                                     min-width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.major }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     min-width="100">
                        <template slot-scope="scope">
                            <el-button size="small" type="info" plain
                                       @click="handleDetail(scope.$index, scope.row)">添加到收件人</el-button>
                        </template>
                    </el-table-column>
                </el-table>
    </el-tab-pane>
    <el-tab-pane label="选择招生渠道" name="second">在这里选择中介/相关人员收件人</el-tab-pane>
    <el-tab-pane label="收件人" name="third">以下是您已选择的收件人</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first',
        currentPage:1,
        loading: false,
        stuList: [],
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>