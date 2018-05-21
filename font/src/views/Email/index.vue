<template>
<div style="display: -webkit-flex;display:flex; flex-flow: row wrap;">
<div style="width: 50%;">
  
  <el-button  plain icon="el-icon-message" type="primary" @click="batchAddStu()">批量添加收件人</el-button>
  <el-form :inline="true"
    class="form-inline">
       <el-form-item >
          <el-input v-model="stuKeywords"
            placeholder="学号/姓名/专业"></el-input>
      </el-form-item>

      <el-form-item>
          <el-button type="primary"
            @click="getStuData()">查询</el-button>
      </el-form-item>
  </el-form>
  <el-table
    :data="stuList"
    @selection-change="changeStu"
    max-height="400">
    <el-table-column type="selection"
        sortable
        @selection-change="changeStu">
    </el-table-column>
    <el-table-column
      label="姓名">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>专业: {{ scope.row.major }}</p>
          <p>邮箱: {{ scope.row.email }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="addStu(scope.$index, scope.row)">添加收件人</el-button>

      </template>
    </el-table-column>
  </el-table>
</div>

<div style="width: 50%;">
  
  <el-button  plain icon="el-icon-message" type="primary" @click="batchAddChannel()">批量添加收件人</el-button>
  <el-form :inline="true"
    class="form-inline">
       <el-form-item >
          <el-input v-model="channelKeywords"
            placeholder="渠道名称/联系人"></el-input>
      </el-form-item>

      <el-form-item>
          <el-button type="primary"
            @click="getChannelData()">查询</el-button>
      </el-form-item>
  </el-form>
  <el-table
    :data="channelList"
    @selection-change="changeChannel"
    max-height="400">
    <el-table-column type="selection"
        sortable
        @selection-change="changeChannel">
    </el-table-column>
    <el-table-column
      label="招生渠道名称">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>联系方式: {{ scope.row.phone }}</p>
          <p>邮箱: {{ scope.row.email }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="addChannel(scope.$index, scope.row)">添加收件人</el-button>

      </template>
    </el-table-column>
  </el-table>
</div>

<div style="width: 100%;margin-top:20px">
  收件人：
  <el-tag
  :key="tag"
  v-for="tag in recipients"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag.name}}
  </el-tag>
</div>
 <div style="margin-top:20px;text-align:center;width:100%">
   <a  style="display:inline-block;" :href="'mailto:'+result" @click="handleResult()">
     <el-button type="primary" >发送</el-button>
   </a>
</div>
</div>
</template>


<style>
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-top:10px;
  }
</style>
<script>
import { getStuList,getChannelList} from 'api/api';
  export default {
    data() {
      return {
        stuSelection:[],
        channelSelection:[],
        stuList:[],
        channelList:[],
        stuKeywords:'',
        channelKeywords:'',
        recipients: [],
        result:'',
      }
    },
    mounted(){
      this.getStuData();
      this.getChannelData();
    },
    methods: {
      changeStu(val) {
        this.stuSelection = val;
      },
      changeChannel(val) {
        this.channelSelection = val;
      },
      handleClose(tag) {
        this.recipients.splice(this.recipients.indexOf(tag), 1);
      },
      getStuData(){
        let that = this;
        getStuList({keywords:that.stuKeywords}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.stuList = res.data.stuList;
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      },
      getChannelData(){
        let that = this;
        getChannelList({keywords:that.channelKeywords}).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            that.channelList = res.data.channelList;
          } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
          } 
        })
      },
      addStu(index,row){
        this.recipients.push(row);
        this.stuList.splice(this.stuList.indexOf(row), 1);
      },
      batchAddStu(){
        let that = this;
        for(let i =0;i<that.stuSelection.length;i++){
          if(that.recipients.indexOf(that.stuSelection[i])==-1){
            that.recipients.push(that.stuSelection[i]);
          }
        }
        for(let i =0;i<this.stuSelection.length;i++){
          this.stuList.splice(this.stuList.indexOf(this.stuSelection[i]), 1);
        }
      },
      addChannel(index,row){
        this.recipients.push(row);
        this.channelList.splice(this.channelList.indexOf(row), 1);
      },
      batchAddChannel(){
        let that = this;
        for(let i =0;i<that.channelSelection.length;i++){
          if(that.recipients.indexOf(that.channelSelection[i])==-1){
            that.recipients.push(that.channelSelection[i]);
          }
        }
        for(let i =0;i<this.channelSelection.length;i++){
          this.channelList.splice(this.channelList.indexOf(this.channelSelection[i]), 1);
        }
      },
      handleResult(){
        let that = this
        for(let i =0;i<that.recipients.length;i++){
          that.result += that.recipients[i].email+','
        }
        console.log(that.result)
      }
    }
  }
</script>