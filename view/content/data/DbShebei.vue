<template>
  <div class="header">
    <el-card class="box-card all">
      <div slot="header" class="clearfix">
        <span class="title">地磅设备</span>
        <el-button class="btn-add" @click="addZhanghu"> <i><img src="@/assets/19.png" alt=""
              class="img-add"></i>添加地磅</el-button>
      </div>
      <div class="big-box" v-for="item in tableData" :key="item.id" >
        <div class="con-l"><span class="txt">{{ item.deviceName }}</span>
          <el-button class="btn-r" @click="uPdata"><i><img src="@/assets/l.png" alt="" class="imgs-x"></i>修改设备信息</el-button>
        </div>
        <div class="con-r" >
          <div><label>设备编号：{{ item.deviceId }}</label></div>
          <div><label>所属企业：{{ item.corpName }}</label></div>
          <div><label>地磅名称：{{ item.deviceName }}</label></div>
          <div><label>设备类型：{{ item.deviceType }}</label></div>
          <div><label>上线称重：{{ item.weighing }}</label></div>
          <div>
            <label>使用状态：
              <span v-show="item.useState==1" :class="{'greColor':item.useState==1}">正常</span>
              <span v-show="item.useState==2"  :class="{'redColor':item.useState==2}">故障</span>
              <span v-show="item.useState==3">停用</span>
            </label>
         
          </div>
          <div><label>创建日期：{{ item.deviceId }}</label></div>
          <div><label>备注说明：{{ item.remark }}</label></div>
        </div>
      </div>

      <el-dialog title="添加地磅" :visible.sync="addDialog" class="dialog">
        <el-form :model="form" :rules="rules" style="width:100%; ">
          <div style="display:flex;">
            <el-form-item label="设备编号：" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-input class="bianhao" v-model="form.deviceId" autocomplete="off" placeholder="请输入">
              </el-input>
            </el-form-item>
            <el-form-item label="设备名称:" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-input class="bianhao" v-model="form.deviceName" autocomplete="off" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="所属企业" :label-width="formLabelWidth" prop="name" class="inpWidth">
            <el-input class="ipt-w inptWidth" v-model="form.corpId" autocomplete="off" placeholder="请输入">
            </el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="name" class="inpt-w" style="display: flex; width: 80%;">
           <el-radio v-model="form.useState" label="1" border>正常</el-radio>
           <el-radio v-model="form.useState" label="2" border>故障</el-radio>
           <el-radio v-model="form.useState" label="3" border>停用</el-radio>
        </el-form-item>
          <div style="display:flex;">
            <el-form-item label="设备类型：" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-select v-model="form.deviceType" placeholder="请选择">
                <el-option label="标准过磅" value="标准过磅"></el-option>
                <el-option label="简单过磅" value="简单过磅"></el-option>
                <el-option label="一次过磅" value="一次过磅"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上限重量:" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-input class="bianhao" v-model="form.weighing" autocomplete="off" placeholder="请输入">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item label="备注说明：" :label-width="formLabelWidth" class="inpWidth">
            <el-input class="ipt-w inptWidth" v-model="form.remark" autocomplete="off" placeholder="请输入" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false"
            style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取 消</el-button>
          <el-button @click="addDibang" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
            定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改地磅" :visible.sync="selectDialog" class="dialog">
        <el-form :model="form" :rules="rules" style="width:100%; ">
          <div style="display:flex;">
            <el-form-item label="设备编号：" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-input class="bianhao" v-model="form.deviceId" autocomplete="off" placeholder="请输入">
              </el-input>
            </el-form-item>
            <el-form-item label="设备名称:" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-input class="bianhao" v-model="form.deviceName" autocomplete="off" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="所属企业" :label-width="formLabelWidth" prop="name" class="inpWidth">
            <el-input class="ipt-w inptWidth" v-model="form.corpId" autocomplete="off" placeholder="请输入">
            </el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="name" class="inpt-w" style="width: 80%;"> 
           <el-radio v-model="form.useState" label="1" border>正常</el-radio>
           <el-radio v-model="form.useState" label="2" border>故障</el-radio>
           <el-radio v-model="form.useState" label="3" border>停用</el-radio>
        </el-form-item>
          <div style="display:flex;">
            <el-form-item label="设备类型：" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-select v-model="form.deviceType" placeholder="请选择">
                <el-option label="标准过磅" value="标准过磅"></el-option>
                <el-option label="简单过磅" value="简单过磅"></el-option>
                <el-option label="一次过磅" value="一次过磅"></el-option>
              </el-select>
            </el-form-item>
          
            <el-form-item label="上限重量:" :label-width="formLabelWidth" prop="name" class="inpt-w">
              <el-input class="bianhao" v-model="form.weighing" autocomplete="off" placeholder="请输入">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item label="备注说明：" :label-width="formLabelWidth" class="inpWidth">
            <el-input class="ipt-w inptWidth" v-model="form.remark" autocomplete="off" placeholder="请输入" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectDialog = false"
            style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取 消</el-button>
          <el-button @click="selectDibang" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
            定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
  
<script>
import { dibangList, dibangAdd } from "@/api/login";
export default {
  data() {
    return {
      show:'',
      form: {
        deviceId: "", //设备编号
        deviceName: "", //设备名称
        deviceType: "", //设备类型
        weighing: "", //上线称重
        corpId: "", //企业id
        useState: "", //使用状态（1-正常2-故障3-停用）
        remark: ""
      },
      tableData: [],
      formLabelWidth: '120px',
      addDialog: false,
      selectDialog: false,
      rules: {
        name: [{ required: true, trigger: "blur" }],
      },
    }
  },
  components: {
    
  },
  mounted() {
  this.fun()
  },
  methods: {
    fun(){
      dibangList({
      page: "1",
      keyword: "",
      useState: ""
    }).then((res) => {
      console.log(res.data.ResData.data, 'dibang');
      this.tableData = res.data.ResData.data
    })
    },
    selectDibang() {
      dibangAdd(
        {
          deviceId: this.form.deviceId,
          deviceName:this.form.deviceName,
          deviceType: this.form.deviceType,
          weighing:this.form.weighing,
          corpId:1,
          useState:this.form.useState,
          remark:this.form.remark,
        }
      ).then((res) => {
        if(res.data.Success=='ture'){
        this.$message('添加成功');
       }else{
        this.$message(res.data.ErrMsg);
       }
        this.tableData=res.data.ResData
        console.log(res);
        this.fun()
      })
      this.selectDialog = false
    },
    addDibang() {
      dibangAdd(
        {
          deviceId: this.form.deviceId,
          deviceName:this.form.deviceName,
          deviceType: this.form.deviceType,
          weighing:this.form.weighing,
          corpId:this.form.corpId,
          useState:this.form.useState,
          remark:'',
        }
      ).then((res) => {
        if(res.data.Success=='ture'){
        this.$message('添加成功');
       }else{
        this.$message(res.data.ErrMsg);
       }
        this.tableData=res.data.ResData
        console.log(res);
        this.fun()
      })
      this.addDialog = false
    },
    uPdata(row) {
      this.form.deviceId=this.tableData.deviceId,
      this.form.deviceName=row.deviceName,
      this.form.deviceType=row.deviceType,
      this.form.weighing=row.weighing,
      this.form.corpId=row.corpId,
      this.form.useState=row.useState,
      this.selectDialog = true
    },
    addZhanghu() {
      this.addDialog = true
    }
  }
};
</script>
  
<style lang="less" scoped>
.greColor{
  color:green;
}
.redColor{
  color:red;
}
::v-deep .el-select>.el-input {
  width: 100%;
}

::v-deep .el-select {
  width: 100%;
}

.inpt-w {
  width: 50%;
}

::v-deep .el-form-item__content {
  margin-left: 120px !important;
}

::v-deep .el-form-item__label {
  width: 100px !important;
}

.txt {
  margin-left: 20px;
}

::v-deep .el-dialog__body {
  padding: 0px 20px;
}

::v-deep .el-card__header {
  padding: 0;
}

.clearfix {
  margin: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.bianhao {
  width: 100% !important;
}

.inptWidth {
  width: 100% !important;
}

.el-dialog__wrapper {
  top: 200px;
}

::v-deep .el-dialog {
  border-radius: 16px;
  overflow: hidden;
}

.botton {
  margin-left: 20px !important;
}

// .oWidth {
//   width: calc(53% + 10px);
// }

// .inpWidth {
//   width: calc(98% + 8px);
// }

.title {
  height: 40px;
  line-height: 40px;
  color: #373737;
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
}

.img-add {
  width: 10px;
  height: 10px;
  // margin-left: 10px;
  margin-right: 10px;
}

.btn-add {
  width: 120px;
  height: 40px !important;
  text-align: center;
  // line-height: 40px;
  background-color: #6971ef;
  color: #fff;
  border-radius: 18px;
  padding-left: 10px;
  position: absolute;
  right: 40px;

}

.nav {
  height: 50px;
  position: relative;
  border-bottom: 1px solid #E6E6E6;
  ;
  margin-bottom: 20px;
  // line-height: 40px;
}

.imgs-x {
  width: 10px;
  height: 10px;
  margin-right: 10px;
}

.con-r {
  // height: 320px;
  // height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px 0;
}

.con-r div {
  font-size: 16px;
  color: #666666;
  padding-left: 20px;
}

.big-box {
  width: 45%;
  // width: 800px;
  height: 40%;
  border: 1px solid #E4E4E4;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}

.btn-r {
  background-color: #FF7C24;
  color: #fff;
  position: absolute;
  right: 20px;
  top: 10px;
  border-radius: 18px;
}

.con-l {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #E4E4E4;
  line-height: 60px;

}

.con-l span {
  font-weight: bold;
  font-size: 18px;
  color: #666666;

}

.all {
  height: 100%;
  background-color: #fff;
  margin: 0px auto;
}

.header {
  width: 100%;
  height: 100%;
}
</style>