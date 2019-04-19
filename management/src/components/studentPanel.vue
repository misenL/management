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
          prop=date
          label="日期"
          style="width: 20%"
          sortable>
        </el-table-column>
        <el-table-column
          prop=name
          label="姓名"
          style="width: 20%"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop=address
          label="下载"
          style="width: 20%">
        </el-table-column>
        <!-- 这是筛选 -->
        <el-table-column
          prop="address"
          label="筛选"
          style="width: 20%"
          :filters="[{ text: '已下载', value: '是' }, { text: '未下载', value: '否' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag
              :type="scope.row.address === '是' ? 'primary' : 'success'"
              disable-transitions>
            <el-checkbox v-model="checked"></el-checkbox>
            </el-tag>
        </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px; min-width: 500px">
        <el-button
          id="Total"
          type="primary"
          icon="el-icon-download"
          :disabled="checked==false">下载</el-button>
        <el-button id="Total" @click="removeTotalSelection()">取消全选</el-button>
        <el-button id="Total" @click="totalSelection()">全选</el-button>
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
}
</style>


<script>
const item = [{
    date: '2018-05-05',
    name: 'MiSen',
    address: '是'
},{
    date: '2018-05-03',
    name: 'MiSen2',
    address: '否'
},{
    date: '2018-05-09',
    name: 'MiSen2',
    address: '否'
},{
    date: '2018-05-10',
    name: 'MiSen2',
    address: '否'
},{
    date: '2018-05-12',
    name: 'MiSen2',
    address: '否'
},{
    date: '2018-05-15',
    name: 'MiSen2',
    address: '否'
},{
    date: '2018-05-23',
    name: 'MiSen2',
    address: '否'
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
        return row.address === value;
      }
      //排序
      // filterHandler(value, row, column) {
      //   const property = column['property'];
      //   return row[property] === value;
      // }
    }
}


</script>


