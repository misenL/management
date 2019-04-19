<template>
<!-- 班级 -->
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="老师"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="作业"
      :formatter="formatter">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-upload 
                         class="upload-demo"  
                         action="http://192.168.400.56:9000/file/rest/common/uploadFilesClientByArray" >
                        <el-button size="mini" type="primary">上传</el-button> 
                  </el-upload> 

        <el-button
          size="mini" 
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: 'PS基础练习'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: 'PS中级练习'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: 'PS高级练习'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: 'PS顶级练习'
        }],
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
        },
        formLabelWidth: '120px'}

    },

    methods: {
      formatter(row, column) {
        return row.address;
      },


    }
  }
</script>