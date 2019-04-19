<template>
<!-- 消息 -->
  <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="作业名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="老师">
            <span>{{ props.row.teacher }}</span>
          </el-form-item>
          <el-form-item label="教学班">
            <span>{{ props.row.class }}</span>
          </el-form-item>
          <el-form-item label="截止日期">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="发送人"
      prop="teacher">
    </el-table-column>
    <el-table-column
      label="作业主题"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData5: [{
          name: 'ps抠图1',
          teacher: '沃尔特',
          class: 'ATC',
          time: '2018-6-30',
          desc: '按照课件要求，自主完成',
        },
        {
          name: 'ps抠图1',
          teacher: '沃尔特',
          class: 'ATC',
          time: '2018-6-30',
          desc: '按照课件要求，自主完成',
        },
        {
          name: 'ps抠图1',
          teacher: '沃尔特',
          class: 'ATC',
          time: '2018-6-30',
          desc: '按照课件要求，自主完成',
        },
        ]
      }
    },
        methods: {
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>