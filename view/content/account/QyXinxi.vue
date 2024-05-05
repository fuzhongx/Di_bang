<template>
  <div class="header">
      <div class='qing_data'>
        <span class="title">企业基本信息</span>
      </div>
      <div>
        <div class="top">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
            style="width:70%;">
            <el-form-item label="企业编号:" prop="id">
              <el-input v-model="ruleForm.id" class="ipnWidth" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业名称:" prop="name">
              <el-input v-model="ruleForm.name" class="ipnWidth" disabled></el-input>
            </el-form-item>
            <el-form-item label="系统名称:" prop="Systername">
              <el-input v-model="ruleForm.Systername" class="ipnWidth" disabled></el-input>
            </el-form-item>
            <div style="display: flex;justify-content: space-between;">
              <el-form-item label="联系人:" class="lianxi">
                <el-input v-model="ruleForm.ren" class="cum-l"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" class="lianxi">
                <el-input v-model="ruleForm.phone" class="cum-r"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="企业地址:" prop="">
              <el-input v-model="ruleForm.adree" class="ipnWidth"></el-input>
            </el-form-item>
            <el-form-item label="备注信息:" prop="">
              <el-input v-model="ruleForm.mark" class="ipnWidth height-h" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div  class="Canshu_shezhi" >
        <span class="title">参数设置</span>
      </div>
      <div>
        <el-form :model="rForm" :rules="rules" ref="rForm" class="demo-ruleForm" style="width:70%">
          <el-form-item label="预约设置:" prop="yuyue" class="item left">
            <div>
              <el-radio v-model="radio1" label="1" border>移动预约审批</el-radio>
              <el-radio v-model="radio1" label="2" border>预约不需要审批</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="预约审批人员:" prop="name" class="item move"  v-show="this.radio1!=2">
            <el-select v-model="ruleForm.quyu" placeholder="请选择活动区域" class="length">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
            <p class="tishi"> <span class="call_text">说明：</span>企业企业信息修改完成后，退出登录后方可生效。</p>
           
          </el-form-item>
        </el-form>
        <el-button class="btn-l">取消</el-button>
        <el-button class="btn-r" @click="newQiye">保存</el-button>
      </div>
  </div>
</template>
  
<script>
import {
  qiyeUser,
  qiyeUpdate,
  qiyelist
} from "@/api/login"
export default {
  data() {
  return {
    list:[],
    radio1: "",
    ruleForm: {
      id: "",
      name: "",
      Systername: "",
      ren: "",
      phone:'',
      adree:'',
      mark:'',
      quyu:''
    },
    rForm: {
      renyuan: "",
    },
    rules: {
      id: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      Systername: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
      ],
      yuyue: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      renyuan: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
      ],
    },
  };
},
  mounted() {
    qiyelist().then(res=>{
        console.log(res.data.ResData.company);
        this.list=res.data.ResData.company
        this.ruleForm.id=res.data.ResData.company.corpNumber
        this.ruleForm.Systername=res.data.ResData.company.sysName
        this.ruleForm.name=res.data.ResData.company.corpName
      })
    qiyeUser().then((res) => {
      console.log(res, 3333);
    })
   
  },
  methods: {
    newQiye() {
      qiyeUpdate({
          id:sessionStorage.getItem('id'),
          corpName:this.ruleForm.name,
          sysName:this.ruleForm.Systername,
          address:this.ruleForm.adree,
          linkMan:this.ruleForm.ren,
          linkTel:this.ruleForm.phone,
          approveMethod:this.radio1,
          approvals:this.ruleForm.quyu
      }).then((res) => {
          console.log(res);
        })
  }
},

components: {

  },
};
</script>
  
<style lang="less" scoped>
.el-radio.is-bordered{
    margin-left: 29px;
}
.move{
  position: relative;
}
.length{
  width: 34% !important;

}
.tishi {
  position: absolute;
  right: 0%;
  top: 0px;
  color: #d1d1d1;
 }
.el-radio.is-bordered {
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    padding: 0px 10px;
}
.Canshu_shezhi{
  border-bottom:1px solid #e6e6e6;
}
.title{
  display: block;
  padding: 10px 10px;
}
.qing_data{
  border-bottom: 1px solid #d1d1d1;
}
.top {
  width: 100%;
}



.lianxi {
  width: 50% !important;
}

.cum-r {
  width: 100% !important;
}

.cum-l {
  width: 100% !important;
}

.title {
  color: #373737;
  font-size: 18px;
  font-weight: bold;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

::v-deep .el-form-item {
 margin-left: 20px;
 margin-bottom: 0px;
 padding-top: 10px;
}



.tt {
  margin-bottom: 20px;
  margin-top: 30px;
}

.btn-l {
  width: 100px;
  height: 30px;
  border-radius: 24px;
  line-height: 5px;
  position: absolute;
  right: 10%;
  bottom: 10px;
  color: #373737 !important;
}
.btn-r {
  width: 100px;
  height: 30px;
  line-height: 5px;
  border-radius: 24px;
  background-color: #6971ef;
  color: #fff;
  position: absolute;
  right: 3%;
  bottom: 10px;
}
.height-h {
  height: 74px !important;
}
.title-h {
  font-size: 18px;
  line-height: 60px;
  padding-left: 20px;
  font-weight: bold;
  color: #373737;
  width: 100%;
  height: 60px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e6e6e6;
}

.chanshu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}

.left {
 margin: 0 20px;
}

.box {
  display: inline-block;
  width: 6px;
  height: 20px;
  border-radius: 5px;
  background-color: #0bc9f8;
  margin-left: 30px;
  margin-top: 6px;
}

.mid {
  display: flex;
}

::v-deep .el-input__inner {
  width: 100%;
  height: 30px !important;
}

.phoneWidth {
  width: 100%;
}

.phone {
  width: 14%;
}

.ipnWidth {
  height: 40px;
}

.mid-text span:nth-child(1) {
  width: 100px;
  line-height: 30px;
  text-align: center;
  height: 30px;
  border-radius: 5px;
  display: inline-block;
  border: 1px solid #759cf8;
  color: #759cf8;
}

.mid-h span:nth-child(2) {
  font-family: "黑体";
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 10px;
}

.lab {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.labw {
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.header {
  width: 100%;
  height: 100%;
}
</style>