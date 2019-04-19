<template>
    <!-- 完成 -->
    <el-main>
    <!-- 数据过多自动显示滚动条 -->
    <el-table
        :data="tableData"
        max-height="350" 
        style="min-width: 500px"
        :default-sort = "{prop: 'date', order: 'descending'}">
        <!-- 引入index方便管理 -->
        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column
          prop=name
          label="未完成作业名称"
          id="taskNameStyle"
          min-width=200
          style="width: 20%"
          :formatter="formatter">
        </el-table-column>
        <!-- 这是占位符 -->
        <el-table-column width='6'></el-table-column>

        <el-table-column
          prop=teacher
          label="老师"
          min-width=100
          style="width: 20%"
          >
        </el-table-column>
        <el-table-column
          prop=class
          label="教学班"
          min-width=100
          style="width: 20%"
          >
        </el-table-column>
        <el-table-column
          prop=time
          label="截止日期"
          style="width: 20%">
        </el-table-column>
    </el-table>
    </el-main>
</template>

<script>
//模拟数据
const item = [{
    name: '毛概一实验字符长度实现样',
    teacher: '松岛枫',
    class: 'AE86',
    time : '2018-6-30'
},{
    name: '的撒旦撒范德萨范德萨',
    teacher: '导航条',
    class: 'AE826',
    time : '2018-6-11'
},{
    name: '单杀官方网',
    teacher: '古文物',
    class: 'dwr2',
    time : '2018-6-20'
},{
    name: '毛概一实验字符长度实现样',
    teacher: '松岛枫',
    class: 'AE86',
    time : '2018-6-30'
}];

export default {
    name: 'taskPanel',
    components: {

    },
    data () {
        return {
            tableData: item,
            checked: false,
        }
    },

    computed: {},
    methods: {
      // 全选 or 全不选
      totalSelection() {
        this.$data.checked = true
      },
      removeTotalSelection() {
        this.$data.checked = false
      },
      // 筛选
      // formatter(row, column) {
      //   return row.name;
      // },
      filterTag(value, row) {
        return row.status === value;
      }
      //排序
      // filterHandler(value, row, column) {
      //   const property = column['property'];
      //   return row[property] === value;
      // }
    }
}


</script>

<style scoped>

.el-dropdown {
  position:absolute;
  z-index: 999;
  min-width: 70px;
  margin-left: 67%;
  margin-top: 13px;
}
.el-dropdown-menu--small .el-dropdown-menu__item {
    line-height: 27px;
    padding: 0 8px;
    font-size: 13px;
}
.el-tag {
  padding: 0;
  height: 16px;
}
.el-checkbox {
  height: 15px;
}
.el-checkbox:first-child {
    margin-top: -8px;
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
}
#Total {
  float: right;
  margin: 0 5px 0 5px;
}
.seeSet {
  width: 50px;
  cursor: pointer;
}
.seeSet:hover {
  color: #409eff;
}
</style>