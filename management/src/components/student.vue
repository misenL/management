<template>

<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-date"></i>教学班</template>
        
        <el-menu-item-group>
        <router-link to="/student/student1">
        <el-menu-item index="1-1">ACT</el-menu-item>
        </router-link>
        </el-menu-item-group>
        
        <el-menu-item-group>
          <el-menu-item index="1-2">CCC</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <el-menu-item index="1-3">WWW</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-edit-outline"></i>作业</template>
        <el-menu-item-group>
          <template slot="title">未完成</template>
          <router-link to="/student/studentunfinished">
          <el-menu-item index="2-1-1">未完成</el-menu-item>
          </router-link>
        </el-menu-item-group>

        <el-menu-item-group title="完成">
          <template slot="title">完成</template>
          <router-link to="/student/studentfinished">
          <el-menu-item index="2-2-1">完成</el-menu-item>
          </router-link>
        </el-menu-item-group>

      </el-submenu>
        <el-menu-item-group>
          <router-link to="/student/studentmsg">
          <el-menu-item index="3"><i class="el-icon-message"></i><el-badge :value="3" class="item">消息</el-badge></el-menu-item>
          </router-link>
          </el-menu-item-group>

    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">加入班级</el-dropdown-item>




          <el-dropdown-item command="b">修改信息</el-dropdown-item>


          <el-dropdown-item command="c">已交作业</el-dropdown-item>



          <el-dropdown-item command="d">更改用户</el-dropdown-item>



        </el-dropdown-menu>
      </el-dropdown>
      <span @click="open3()">王小虎</span>
    </el-header>
    
    <el-main>

<el-dialog title="我的作业" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-dialog>

<el-dialog title="加入班级" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="班级名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

<template>
<router-view></router-view>
</template>

    </el-main>

  </el-container>
</el-container>  
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
      open3() {

        const h = this.$createElement;
        this.$msgbox({
          title: '请输入学号，密码',
          message: h('p', null, [
            h('span', null, '学号：'),
            h('el-input', { style: 'color: teal' }),
            h('br'),
            h('span', null, '密码：'),
            h('el-input', { style: 'color: teal' })
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },

      gtb(){
        this.dialogTableVisible=true;
        
      },
      gbj(){
        this.dialogFormVisible = true
      },
      gxg(){
        //修改信息
        this.$router.push('/student/studentmdf'); 
      },
      ggg(){
        //更改用户
      },

      
      handleCommand(command) {
        var i =command
        console.log(command)

        if(i == 'a'){
          this.gbj();
        } else
        if(i == 'b'){
          //修改信息
          this.gxg();
        } else
        if(i == 'c'){
          this.gtb();
        } else
        if(command == 'd'){
          //更改用户
        }    

      },      




    }
  }
</script>