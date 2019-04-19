<template>
    <!-- 中间内容 -->
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
          prop=taskName
          label="作业名称"
          id="taskNameStyle"
          min-width=200
          style="width: 20%"
          :formatter="formatter">
        </el-table-column>
        <!-- 这是占位符 -->
        <el-table-column width='6'></el-table-column>

        <el-table-column
          prop=startDate
          label="开始日期"
          min-width=100
          style="width: 20%"
          sortable>
        </el-table-column>
        <el-table-column
          prop=overDate
          label="结束日期"
          min-width=100
          style="width: 20%"
          sortable>
        </el-table-column>
        <el-table-column
          prop=status
          label="作业状态"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          label=""
          style="width: 5%">
          <template slot-scope="seeSet">
            <span class="seeSet">查看</span>
            <span class="seeSet">修改</span>
          </template>
        </el-table-column>
        <!-- 这是筛选 -->
        <el-table-column
          prop="status"
          label="筛选"
          style="width: 20%"
          :filters="[{ text: '接收提交', value: '接收提交' }, { text: '拒绝提交', value: '拒绝提交' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '接收提交' ? 'primary' : 'success'"
              disable-transitions>
            <el-checkbox v-model="checked"></el-checkbox>
            </el-tag>
        </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px; min-width: 500px">
        <el-button
          id="Total"
          type="danger"
          icon="el-icon-delete"
          :disabled="checked==false"
          circle></el-button>
        <el-button id="Total" @click="removeTotalSelection()">添加作业</el-button>
        <el-button id="Total" @click="totalSelection()">切换状态</el-button>
    </div>
    </el-main>
</template>

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


<script>
//模拟数据
const item = [{
    taskName: '毛概一实验字符长度实现样式调试应该再短一点把宽度设置自动换行点击之后要跳转到作业面板',
    startDate: '2018-05-05',
    overDate: '2018-05-12',
    status: '接收提交'
},{
    taskName: 'MiSen',
    startDate: '2018-05-06',
    overDate: '2018-05-12',
    status: '拒绝提交'
},{
    taskName: 'MiSen',
    startDate: '2018-05-08',
    overDate: '2018-05-14',
    status: '接收提交'
},{
    taskName: 'MiSen',
    startDate: '2018-05-03',
    overDate: '2018-05-12',
    status: '解决提交'
},{
    taskName: 'MiSen',
    startDate: '2018-05-05',
    overDate: '2018-05-12',
    status: '接收提交'
},{
    taskName: 'MiSen',
    startDate: '2018-05-01',
    overDate: '2018-05-30',
    status: '拒绝提交'
},{
    taskName: 'MiSen',
    startDate: '2018-05-07',
    overDate: '2018-05-16',
    status: '接收提交'
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


