<template>
  <div class="header">
    <div class="all">
          <button class="btn-add" @click="addZhanghu">
            <i><img src="@/assets/19.png" alt="" class="img-add" /></i>添加账户</button>
      </div>
      <div>
        <el-table
          border
          :data="tatleList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          class="table"
          :header-cell-style="{
            background: '#e9e8e8c0',
            border: '1px solid #e9e9ee',
          }"
        >
          <el-table-column fixed prop="" label="序号" align="center" type="index">
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center">
          </el-table-column>
          <el-table-column prop="corpName" label="所属企业" align="center">
          </el-table-column>
          <el-table-column prop="act" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="用户名" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="手机号" align="center">
          </el-table-column>
          <el-table-column prop="roleName" label="管理角色" align="center">
          </el-table-column>
          <el-table-column prop="sex" label="性别" align="center">
          </el-table-column>
          <el-table-column prop="userState" label="登录状态" align="center">
            <template slot-scope="scope">
              <span :class="{ txtColor: scope.row.userState == 0 }" v-if="scope.row.userState == 0">正常</span>
              <span :class="{ txt2Color:scope.row.userState == 1 }" v-else>禁止登录</span>
            </template>
           
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="创建时间" align="center">
          </el-table-column>
          <el-table-column prop="zip" label="最后登陆" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <sapn
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="btnColor"
                >编辑</sapn
              >
              <span class="bor"></span>
              <el-popconfirm title="是否恢复登陆" @confirm="Huireset(scope.row)">
                <sapn slot="reference"  type="text" size="small" class="btnColor" v-show="scope.row.userState==1" >恢复登陆</sapn>
                </el-popconfirm>
               
                <el-popconfirm title="是否禁止登陆" @confirm="Oreset(scope.row)">
      
                <sapn  slot="reference"  type="text" size="small" class="btnColor" v-show="scope.row.userState==0">禁止登陆</sapn >
                </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页数 -->
      <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
          :page-sizes="[5]"
          :page-size="100"
          :current-page="currentPage"
          layout=" prev, pager, next, jumper,total"
          :total="total"
        >
        </el-pagination>
      </div>
      </div>
      <!-- 添加操作 -->
      <el-dialog title="添加账号" :visible.sync="addDialog" class="dialog">
        <el-form :model="form" :rules="rules" style="width: 100%">
          <el-form-item
            label="账号："
            :label-width="formLabelWidth"
            prop="name"
            class="tWidth"
          >
            <el-input
              v-model="form.zhanghao"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属企业：" :label-width="formLabelWidth">
            <el-input
              v-model="form.qiye"
              autocomplete="off"
              placeholder="请输入"
              class="qiye"
            ></el-input>
          </el-form-item>
          <div style="display: flex">
            <el-form-item
              label="真实姓名："
              :label-width="formLabelWidth"
              autocomplete="off"
              prop="name"
              class="tWidth"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="性别："
              :label-width="formLabelWidth"
              prop="sex"
              class="tWidth"
              autocomplete="off"
            >
              <el-input
                class="zhenshi"
                v-model="form.sex"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item
              label="用户名："
              :label-width="formLabelWidth"
              prop="username"
              class="tWidth"
            >
              <el-input
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号："
              :label-width="formLabelWidth"
              prop="phone"
              class="tWidth"
            >
              <el-input
                v-model="form.phone"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item
            label="管理角色"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-radio v-model="form.radio" :label="1" border>系统管理员</el-radio>
            <el-radio v-model="form.radio"  :label="2" border>管理员</el-radio>
            <el-radio v-model="form.radio" :label="3" border>过磅员</el-radio>
          </el-form-item>
          <el-form-item
            label="备注说明："
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.beizhu"
              autocomplete="off"
              placeholder="请输入备注说明"
              class="qiye"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="addDialog = false"
            style="
              background-color: #fff;
              color: #666666;
              border-radius: 18px;
              border: 1px solid #d1d1d1;
            "
            >取 消</el-button
          >
          <el-button
            @click="addsubmit"
            style="background-color: #6971ef; color: #fff; border-radius: 18px"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!--编辑操作 -->
      <el-dialog title="编辑账号" :visible.sync="selectDialog" class="dialog">
        <el-form :model="form" :rules="rules" style="width: 100%">
          <el-form-item
            label="账号："
            :label-width="formLabelWidth"
            prop="name"
            class="tWidth"
          >
            <el-input
              v-model="form.zhanghao"
              autocomplete="off"
              placeholder="请输入"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="所属企业：" :label-width="formLabelWidth">
            <el-input
              v-model="form.qiye"
              autocomplete="off"
              placeholder="请输入"
              class="qiye"
              disabled
            ></el-input>
          </el-form-item>
          <div style="display: flex">
            <el-form-item
              label="真实姓名："
              :label-width="formLabelWidth"
              prop="name"
              class="tWidth"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="性别："
              :label-width="formLabelWidth"
              prop="name"
              class="tWidth"
            >
              <el-input
                class="zhenshi"
                v-model="form.sex"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item
              label="用户名："
              :label-width="formLabelWidth"
              prop="name"
              class="tWidth"
            >
              <el-input
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号："
              :label-width="formLabelWidth"
              prop="name"
              class="tWidth"
            >
              <el-input
                v-model="form.phone"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item
            label="管理角色"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-radio v-model="form.radio" :label="1" border>系统管理员</el-radio>
            <el-radio v-model="form.radio" :label="2" border>管理员</el-radio>
            <el-radio v-model="form.radio" :label="3" border>过磅员</el-radio>
          </el-form-item>
          <el-form-item
            label="备注说明："
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.beizhu"
              autocomplete="off"
              placeholder="请输入备注说明"
              class="qiye"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="selectDialog = false"
            style="
              background-color: #fff;
              color: #666666;
              border-radius: 18px;
              border: 1px solid #d1d1d1;
            "
            >取 消</el-button
          >
          <el-button
            @click="selectZhanghu"
            style="background-color: #6971ef; color: #fff; border-radius: 18px"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
</template>
  
<script>
import {
  ZhList,
  UpZhList,
  ZhOne,
  reset
} from "@/api/login"
export default {
  data() {
    return {
      pageSize:5,
      pageSizes:[5,10,15],
      currentPage:1,
      selectDialog: false,
      start: 1,
      addDialog: false,
      tatleList:[],
      newtable:[],
      form: {
        zhanghao:'',
        qiye:'',
        phone:'',
        name: "",
        sex:'',
        username:'',
        radio:1,
        beizhu:''
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, trigger: "blur" }],
      },
    };
  },
  
  mounted(){
    this.zhangList()
    this.oZhOne()
  },
  methods: {
    handleSizeChange(val) {       
      this.currentPage = 1;
      this.pageSize = val;
      this.zhangList();
    },
    //切换当前页
    handleCurrentChange(val) {    
      this.currentPage = val;
      this.zhangList();
    },
     Oreset(row){
      reset({
         id:row.id,
         status:"1"
      }).then((res)=>{
        console.log(res);
        this.zhangList()
      })
     },
     Huireset(row){
      reset({
         id:row.id,
         status:"0"
      }).then((res)=>{
        console.log(res);
        this.zhangList()
      })
     },
    oZhOne(){
      ZhOne({
        id:10006
    }).then((res)=>{
      console.log(res);
    })
    },
    addsubmit(){
      UpZhList({
        act:this.form.username,
        userName:this.form.name,
        userTel:this.form.phone,
        corpId:this.form.qiye,
        sex:this.form.sex,
        roleId:this.form.radio,
        remark:this.form.beizhu,
      }).then((res)=>{
        console.log(res);
        this.tatleList=res.data.ResData
      })
      this.addDialog = false    ;
    },

    zhangList(){
      ZhList(
        JSON.stringify({
          page:1, 
          keyword:Cookies.get('act')
        })
      ).then((res)=>{
      console.log(res,'1213');
      this.tatleList=res.data.ResData.data
      this.total=res.data.ResData.total
      }
      )
    },
    addZhanghu() {
      this.addDialog = true;
    },
    handleClick(row) {
      this.selectDialog = true;
      console.log(row);
        this.form.username=row.userName
        this.form.name=row.act
        this.form.phone=row.userTel
        this.form.qiye=row.corpName
        this.form.sex=row.sex
        this.form.radio=row.userState
        this.form.beizhu=row.remark
        this.form.zhanghao=row.id
    },
    selectZhanghu(){
      UpZhList({
        act:this.form.username,
        userName:this.form.name,
        userTel:this.form.phone,
        corpId:this.form.qiye,
        sex:this.form.sex,
        roleId:this.form.radio,
        remark:this.form.beizhu,
      }).then((res)=>{
        console.log(res);
        this.tatleList=res.data.ResData
      })
      this.selectDialog = false
    }
  },
  components: {
  
  },
};
</script>

.
<style  lang='less' scoped>
::v-deep .el-pagination{
  color: #999999;
}
::v-deep .el-pagination .btn-prev{
  color: #999999;
}
::v-deep .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
  color: #999999;
}
::v-deep .el-pagination__total{
  color: #999999;
  margin-left: 10px;
}
::v-deep .el-pagination__jump{
  color: #999999;
}
.quxiao {
  background-color: #fff;
  color: #666666;
  border-radius: 18px;
  border: 1px solid #d1d1d1;
}
.table {
  width: 98%;
  text-align: center;
  margin: 20px auto;
}
::v-deep .el-form-item__content {
  margin-left: 120px !important;
}
::v-deep .el-form-item__label {
  width: 100px !important;
}
::v-deep .el-dialog__body {
  padding: 0px 20px;
}
.tWidth {
  width: 50% !important;
}
::v-deep .el-dialog {
  border-radius: 16px !important;
  overflow: hidden;
}
.el-dialog__wrapper {
  border-radius: 16px !important;
}
.height {
  width: 654px !important;
}
.left-l {
  margin-left: 80px !important;
}
.qiye {
  width: 100% !important;
  height: 40px !important;
}
.ipt-w {
  width: 50% !important ;
  height: 40px;
}
.txtColor {
  color: #67c23a;
}

.txt2Color {
  color: #f56c6c;
}

.btnColor {
  color: #6971ef;
  cursor: pointer;
}

.bor {
  display: inline-block;
  background-color: #6971ef;
  border-radius: 2px;
  width: 2px;
  height: 10px;
  margin: 0 10px;
}
.block{
position: relative;
// right: 10%;
}
.title {
  color: #373737;
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
  padding-top: 5px;
  display: block;
  height: 40px;
  line-height: 40px;
}

.img-add {
  width: 10px;
  height: 10px;
  margin-left: 10px;
  margin-right: 10px;
  color: #1890ff;
  background: #1890ff;
}

.btn-add {
  width: 100px;
  height: 30px !important;
  text-align: center;
  line-height: 30px;
  background-color: #e8f4ff;
  border-color: #6bb3f7;
  color: #1890ff;
  margin: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}

.nav {
  height: 50px;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}

::v-deep .el-form-item {
  margin-bottom: 20px;
}


.all {
  width: 100%;
  position: relative;
  height: 40px;
  background-color: #fff;
  border-radius: 10px;
}

.add {
  position: absolute;
  right:20px;
}
.header {
  width: 100%;
  height: 100%;
}

::v-deep .el-button {
  height: 40px;
  text-align: center;
  line-height: 0px;
  margin-left: 20px;
}
</style>