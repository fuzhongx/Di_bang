<template>
    <div>
      <el-form class="all">
        <el-form-item label="关键词:" prop="age" class="guanjian">
          <el-input autocomplete="off" placeholder="车牌号/司机" class="inpws" v-model="keyName"></el-input>
          <el-button class="btn" @click="lookSelect">
            <i class="ic"><img src="@/assets/s.png" alt="" class="piliang" /></i>搜索</el-button>
          <el-button class="btn2" @click="mdialog = true">
            <i style="margin-right: 10px"><img src="@/assets/l.png" alt="" class="piliang" /></i>批量审批</el-button>
          <el-button type="primary" class="btn-R" @click="addCar"><i><img src="@/assets/19.png" alt=""
                class="add" /></i>添加车辆预约</el-button>
        </el-form-item>
        <el-form-item> </el-form-item>
        <div style="width: 100%">
          <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :header-cell-style="{ background: '#E4E4E4' }" border class="table" @selection-change="handleSelectionChange"
            tooltip-effect="dark" ref="multipleTable">
            <el-table-column prop="date" label="" align="center" type="selection">
            </el-table-column>
            <el-table-column label="序号" align="center" type="index">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="carNumber" label="车牌号" align="center">
              <template slot-scope="scope">
                <span class="carColor" @click="look(scope.row)">{{ scope.row.carNumber }}</span>
              </template>
              <!-- <span class="carColor" @click="look">苏K12122</span> -->
            </el-table-column>
            <el-table-column prop="carType" label="车辆类型" align="center">
            </el-table-column>
            <el-table-column prop="buckleWeight" label="皮重(kg)" align="center">
            </el-table-column>
            <el-table-column prop="driver" label="司机" align="center">
            </el-table-column>
            <el-table-column prop="driverTel" label="联系方式" align="center">
            </el-table-column>
            <el-table-column prop="categoryName" label="物资大类" align="center">
            </el-table-column>
            <el-table-column prop="goods" label="物资小类" align="center">
            </el-table-column>
            <el-table-column prop="unitName" label="收货单位" align="center">
            </el-table-column>
            <el-table-column prop="appointmentDate" label="预约日期" align="center">
            </el-table-column>
            <el-table-column prop="zip" label="预约来源" align="center">
            </el-table-column>
            <el-table-column prop="zip" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="appointmentState" label="预约审批" align="center">
              <template slot-scope="scope">
                <span v-show="scope.row.appointmentState == 0"
                  :class="{ ocolor: 'scope.row.appointmentState==0' }">审批中</span>
                <span v-show="scope.row.appointmentState == 1"
                  :class="{ tcolor: 'scope.row.appointmentState==1' }">预约成功</span>
                <span v-show="scope.row.appointmentState == -1"
                  :class="{ rcolor: 'scope.row.appointmentState==-1' }">已取消</span>
                <span v-show="scope.row.appointmentState == 2"
                  :class="{ rcolor: 'scope.row.appointmentState==2' }">审批驳回</span>
              </template>
            </el-table-column>
            <el-table-column prop="zip" label="操作" align="center">
              <template slot-scope="scope">
                <el-popconfirm title="是否恢复登陆" @confirm="unbtn(scope.row)">
                  <span slot="reference"  class="unbtn">取消预约</span>
                  </el-popconfirm>
               
              </template>
  
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <!-- 添加车 -->
      <el-dialog title="添加车辆" :visible.sync="dialog">
        <el-form :model="form" :rules="rules" style="width: 100%">
          <el-form-item label="车牌号:" prop="carNumber" :label-width="formLabelWidth" class="left">
            <el-select v-model="form.carNumber" placeholder="请选择状态" class="length">
              <el-option :label="item.carNumber" :value="item.carNumber" v-for="item in carList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
            <el-form-item label="车辆类型:" :label-width="formLabelWidth" prop="leixing" class="left">
              <el-input v-model="form.leixing" autocomplete="off" placeholder="请输入" class="inpWidth"></el-input>
            </el-form-item>
            <el-form-item label="车辆皮重:" :label-width="formLabelWidth" prop="pizhong" class="left">
              <el-input v-model="form.pizhong" autocomplete="off" placeholder="请输入" class="inpWidth">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="司机姓名:" :label-width="formLabelWidth" prop="name" class="left">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入" class="inpWidth"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" :label-width="formLabelWidth" prop="name" class="left">
              <el-input v-model="form.phone" autocomplete="off" placeholder="请输入" class="inpWidth"></el-input>
            </el-form-item>
            <el-form-item label="关联收货单位:" prop="consigneeIds" :label-width="formLabelWidth" class="left">
              <el-select v-model="form.danwei" placeholder="请选择状态" class="length">
                <el-option :label="item.consigneeIds" :value="item.consigneeIds" v-for="item in carList"
                  :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="货源产地:" :label-width="formLabelWidth" prop="candi" class="left">
              <el-input v-model="form.candi" autocomplete="off" placeholder="请输入" class="inpWidth"></el-input>
            </el-form-item>
          </div>
  
          <el-form-item label="运输物资:" prop="wuzi" :label-width="formLabelWidth" style="width: 100%">
            <el-cascader placeholder="试试搜索：指南" v-model="form.wuzi" :options="options" collapse-tags
              :props="{ multiple: true }" filterable @change="handleChangeList" size="mini"></el-cascader>
          </el-form-item>
          <el-form-item label="预约时间:" :label-width="formLabelWidth" prop="time" class="">
            <el-col :span="11" style="width: 100%">
              <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.time"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="备注说明:" :label-width="formLabelWidth" prop="beizhu" class="">
            <el-input v-model="form.beizhu" autocomplete="off" placeholder="请输入" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false" style="
              background-color: #fff;
              color: #666666;
              border-radius: 18px;
              border: 1px solid #d1d1d1;
            ">取 消</el-button>
          <el-button @click="queren" style="background-color: #6971ef; color: #fff; border-radius: 18px">确
            定</el-button>
        </div>
      </el-dialog>
      <!-- 批量审批 -->
      <el-dialog title="批量审批" :visible.sync="mdialog">
        <el-form :model="form" :rules="rules" style="display: flex; flex-wrap: wrap; flex-direction: column">
          <el-form-item label="审批结果:" prop="name" :label-width="formLabelWidth">
            <el-radio-group v-model="shenpi.radio" size="medium">
              <el-radio border label="1">审批通过</el-radio>
              <el-radio border label="2">审批驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审批备注:" prop="name" :label-width="formLabelWidth" v-show="this.shenpi.radio == 2"
            autocomplete="off">
            <el-input autocomplete="off" placeholder="驳回原因" type="textarea" v-model="shenpi.beizhu"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="mdialog = false" class="qu">取 消</el-button>
          <el-button @click="oshenpi" class="que">确 定</el-button>
  
        </div>
      </el-dialog>
  
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :before-close="handleClose" size="666px">
        <div style="width: 100%" class="header-chebian">
          <div class="top">
            <span class="yuyue">预约详情</span>
            <i @click="del"><img src="@/assets/del.png" alt="" class="del" /></i>
          </div>
          <div class="cont">
            <span class="icont"></span>
            <div class="xinxi">预约车辆信息</div>
            <div class="imgs-s">
              <div class="bgColor"><img src="@/assets/11.png" alt="" /></div>
              <div class="bgColor"></div>
            </div>
            <div class="txt">
              <span class="car-l">车牌号：{{ this.cheList.carNumber }}</span>
              <span>车辆类型：{{ this.cheList.carType }}</span>
              <span>车辆皮重：{{ this.cheList.buckleWeight }}</span>
              <span class="li">货源产地：{{ this.cheList.carNumber }}</span>
              <span>司机姓名：{{ this.cheList.driver }}</span>
              <span class="li">运输物资：{{ this.cheList.categoryName }}:{{ this.cheList.goods }}</span>
              <span>联系电话：{{ this.cheList.driverTel }}</span>
              <span class="li">预约日期：{{ this.cheList.appointmentDate }}</span>
              <span>收货单位：{{ this.cheList.unitName }}</span>
              <span class="li">预约备注：</span>
            </div>
          </div>
  
          <div class="cont-t">
            <span class="icont"></span>
            <div class="jilu">预约记录</div>
            <div class="zhifu">
              <span class="laiyuan">预约来源：{{ this.cheList.source }}</span>
              <span class="laiyuan" v-show="this.cheList.appointmentState == 1">预约审批：<span
                  :class="'yuColor : this.cheList.appointmentState ==1'">预约成功</span> </span>
              <span class="laiyuan" v-show="this.cheList.appointmentState == 0">预约审批：<span
                  :class="'yuColor1 : this.cheList.appointmentState ==0'">审批中</span> </span>
              <span class="laiyuan" v-show="this.cheList.appointmentState == 2"
                :class="'yuColor2 : this.cheList.appointmentState ==2'">预约审批：<span>审批驳回</span> </span>
              <span class="laiyuan" v-show="this.cheList.appointmentState == -1"
                :class="'yuColor3 : this.cheList.appointmentState ==-1'">预约审批：<span>已取消预约</span> </span>
              <span class="laiyuan">预约时间：{{ this.cheList.appointmentDate }}</span>
            </div>
          </div>
        </div>
      </el-drawer>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout=" prev, pager, next, jumper,total"
          :total=this.tableData.length>
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import {
    CarList, CarRes, submitShenpi,
    carliebiai, quxiao, shePi, xiangqing
  } from "@/api/login"
//   import axios from 'axios';
  export default {
    data() {
      return {
        pageSize: 5,
        pageSizes: [5, 10],
        currentPage: 1,
        olist: [],
        dalei: '',
        ids: [],
        list: [],
        xiaolei: '',
        form: {
          carNumber: '',
          leixing: '',
          pizhong: '',
          name: '',
          phone: '',
          danwei: '',
          candi: '',
          wuzi: '',
          time: '',
          beizhu: ''
        },
        shenpi: {
          radio: '',
          beizhu: ''
        },
        keyName: '',
        multipleSelection: [],
        mdialog: false,
        drawer: false,
        dialog: false,
        index: 1,
  
        formLabelWidth: "120px",
        canshu: {
          id: 1,
          status: '0'
        },
        rules: {
          carNumber: [{ required: true, trigger: "blur",message:'请输入车牌号' }],
          leixing: [{ required: true, trigger: "blur",message:'请输入类型'  }],
          pizhong: [{ required: true, trigger: "blur",message:'请输入皮重'  }],
          name: [{ required: true, trigger: "blur",message:'请输入名称'  }],
          phone: [{ required: true, trigger: "blur",message:'请输入手机号'  }],
          danwei: [{ required: true, trigger: "blur" ,message:'请输入单位' }],
          candi: [{ required: true, trigger: "blur" ,message:'请输入产地' }],
          wuzi: [{ required: true, trigger: "blur",message:'请输入物资'  }],
          time: [{ required: true, trigger: "blur" ,message:'请输入时间' }],
          // beizhu: [{ required: true, trigger: "blur" ,message:'请输入备注' }],
  
        },
        carList: [],
        tableData: [],
        cheList: [],
        id: '',
        options: [
          {
            value: "1",
            label: "水果",
            children: [
              {
                value: "1",
                label: "苹果",
              },
              {
                value: "2",
                label: "西瓜",
              },
              {
                value: "3",
                label: "梨子",
              },
              {
                value: "4",
                label: "芒果",
              },
            ],
          },
          {
            value: "1",
            label: "蔬菜",
            children: [
              {
                value: "1",
                label: "苹果",
              },
              {
                value: "2",
                label: "西瓜",
              },
              {
                value: "3",
                label: "梨子",
              },
              {
                value: "4",
                label: "芒果",
              },
            ],
          },
        ]
      }
    },
    mounted() {
      // this.listtable()
      carliebiai().then(res => {
        console.log(res);
        this.carList = res.data.ResData
      })
      this.lookSelect()
    },
    methods: {
      handleChangeList(e) {
        console.log(e, 'lianji');
  
        e.forEach(item => {
          this.olist.push(item[1])
          this.dalei = item[0]
          this.xiaolei = item[1]
        })
        console.log(e[1], '567890');
        console.log(this.xiaolei, '590');
      },
      getList() {
        CarList().then((res) => {
          console.log(res, '123133');
          this.tableData = res.data.ResData
        })
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.lookSelect();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.lookSelect();
      },
      queren() {
        submitShenpi({
          carNumber: this.form.carNumber,
          vehicleId: 1,
          carType: this.form.leixing,
          driver: this.form.name,
          driverTel: this.form.phone,
          buckleWeight: this.form.pizhong,
          consigneeId: this.form.danwei,
          categoryId: this.dalei,
          goodsIds: this.xiaolei,
          appointmentDate: this.form.time,
          goodsOrigin: this.form.candi,
          remark: this.form.beizhu
        }).then((res) => {
        //   if (res.data.Success = true) {
        //     this.tableData = res.data.ResData
        //     this.$message('添加成功');
        //   } else {
        //     this.$message(res.data.ErrMsg);
        //   }
        console.log(res);
          this.lookSelect()
        })
        this.dialog = false
      },
      unbtn(row) {
        quxiao({
          id: row.id
        }).then(res => {
          console.log(res);
          this.lookSelect()
        })
      },
      oshenpi() {
        shePi({
          ids: this.id,
          status: this.shenpi.radio,
          rejectReason: this.shenpi.beizhu
        }).then((res) => {
          console.log(res.data.ErrMsg);
        //   if (res.data.Success = 'false') {
        //     alert(res.data.ErrMsg)
        //   }
        }).catch((res) => {
          alert(res.ErrMsg)
        })
        this.mdialog = false
      },
      lookSelect() {
        CarRes(
          {
            page: "1",
            keyword: this.keyName
          }
        ).then(res => {
          console.log(res);
          this.tableData = res.data.ResData.data
        }).catch(error => {
          console.log(error);
        })
      },
      look(row) {
        this.drawer = true;
        xiangqing({
          id: row.id
        }).then(res => {
          this.cheList = res.data.ResData
          console.log(res, '88');
        })
      },
      handleSelectionChange(val) {
        let arr = []
        // this.multipleSelection = val;
        val.forEach(item => {
          arr.push(item.id)
          this.id = item.id
          this.ids = arr
        })
  
        console.log(this.ids);
  
      },
      handleClose() { },
      del() {
        this.drawer = false;
      },
      addCar() {
        this.dialog = true;
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
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
  .laiyuan {
    margin-left: 20px;
  }
  
  ::v-deep .el-pagination .el-select .el-input .el-input__inner {
    width: 100px !important;
    margin-top: 3px;
    height: 40px;
  }
  
  ::v-deep .el-pagination span:not([class*=suffix]) {
    margin-left: 5px !important;
  }
  
  ::v-deep .el-pagination .el-select .el-input {
    margin: 0;
  }
  
  // ::v-deep .el-pagination .el-select .el-input .el-input__inner{
  //   width: 100px !important;
  // }
  .yuColor {
    color: green !important;
  }
  
  .yuColor2 {
    color: red !important;
  }
  
  .li {
    margin-left: 20px;
  }
  
  ::v-deep .el-tabs__content {
    overflow: inherit !important;
  }
  
  .header-chebian {
    padding: 0 20px;
  }
  
  .block {
    position: absolute;
    right: 20px;
    bottom: 0px !important;
  }
  
  .xinxi {
    border-bottom: 1px solid #e4e4e4;
    height: 60px;
    padding-left: 35px;
    font-size: 18px;
    line-height: 60px;
    background: #fafafa;
  }
  
  .cont-t {
    margin: 20px auto;
    // width: 620px;
    height: 175px;
    border: 1px solid #e4e4e4;
    border-radius: 4px 4px 0 0;
    position: relative;
  }
  
  .jilu {
    border-bottom: 1px solid #e4e4e4;
    height: 60px;
    padding-left: 35px;
    font-size: 18px;
    line-height: 60px;
    background: #fafafa;
  }
  
  .car-l {
    margin-left: 15px;
  }
  
  .cont {
    margin: 0 auto;
    // width: 620px;
    height: 439px;
    border: 1px solid #e4e4e4;
    border-radius: 4px 4px 0 0;
    position: relative;
  }
  
  .top {
    margin: 20px auto;
    // width: 620px;
    position: relative;
  }
  
  .yuyue {
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 1px;
  }
  
  .inpws {
    width: 254px !important;
  }
  
  .guanjian {
    margin-left: -50px;
  }
  
  .table {
    width: 99%;
    text-align: center;
    margin: 0 auto;
  }
  
  .add {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }
  
  .piliang {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }
  
  ::v-deep .el-select .el-input .el-select__caret {
    position: absolute !important;
    top: 0px !important;
    right: 0px !important;
  }
  
  ::v-deep .el-form-item {
    margin-bottom: 10px !important;
  }
  
  .que {
    background-color: #6971ef !important;
    color: #fff !important;
    border-radius: 18px !important;
  }
  
  .qu {
    background-color: #fff !important;
    color: #666666;
    border-radius: 18px !important;
    border: 1px solid #d1d1d1 !important;
  }
  
  ::v-deep .el-form-item__label {
    width: 120px !important;
  }
  
  ::v-deep .el-form-item__content {
    margin-left: 120px !important;
  }
  
  .btn:active:focus,
  .btn:focus {
    outline: 0px auto -webkit-focus-ring-color;
  }
  
  ::v-deep [data-v-c5bfdf12] [data-v-c5bfdf12] .el-dialog {
    width: 18% !important;
  }
  
  ::v-deep .el-dialog__body {
    padding: 0px 20px;
  }
  
  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 40%;
  }
  
  ::v-deep .el-cascader--mini {
    width: 100%;
  }
  
  ::v-deep .el-cascader .el-input {
    width: 100%;
  }
  
  ::v-deep .el-select>.el-input {
    width: 100%;
  }
  
  ::v-deep .el-select {
    width: 100%;
  }
  
  .inpWidth {
    width: 100% !important;
  }
  
  .left {
    width: 50%;
  }
  
  .wuzi {
    width: 100% !important;
  }
  
  .cascder {
    width: 100%;
  }
  
  .bgColor {
    background-color: #e4e4e4;
    width: 48%;
    height: 186px;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
  }
  
  .imgs-s {
    width: 100%;
    display: flex;
    margin-top: 20px 0;
    justify-content: space-evenly;
    align-items: center;
  }
  
  .bgColor img {
    width: 100%;
    height: 186px;
    border-radius: 5px;
  }
  
  .icont {
    position: absolute;
    left: 20px;
    top: 20px;
    display: inline-block;
    width: 5px;
    height: 20px;
    background-color: #6971ef;
    border-radius: 4px;
  }
  
  .del {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 10px;
    // top: 20px;
  }
  
  .size-img {
    width: 100%;
  }
  
  .imgs {
    width: 22%;
    height: 90px;
    overflow: hidden;
  }
  
  .p {
    font-size: 16px;
    color: #666666;
    // line-height: 28px;
    padding: 0 20px;
    height: 20px;
  }
  
  .zhifu span {
    font-size: 16px;
    color: #666666;
    width: 50%;
    // padding-left: 20px;
    line-height: 28px;
  }
  
  .zhifu {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  .txt {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    width: 100%;
  }
  
  .txt span {
    display: inline-block;
    width: 40%;
    padding-left: 20px;
    font-size: 16px;
    color: #666666;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    line-height: 28px;
  }
  
  // ::v-deep [data-v-53b97b6c] .el-form-item{
  //   margin-left: -8px !important;
  //   margin-bottom: 5px !important;
  // }
  ::v-deep [data-v-c5bfdf12] .el-dialog {
    border-radius: 10px;
  
  }
  
  .carColor {
    color: #6971ef;
    cursor: pointer;
  }
  
  .ocolor {
    color: red;
  }
  
  .tcolor {
    color: green;
  }
  
  .rcolor {
    color: gray;
  }
  
  .unbtn {
    color: #6971ef;
    cursor: pointer;
  }
  
  .btn {
    width: 84px;
    text-align: center;
    background-color: #6971ef !important;
    border-radius: 18px !important;
    color: #fff !important;
  }
  
  .btn2 {
    position: absolute !important;
    right: 160px !important;
    text-align: center;
    line-height: 40px;
    background-color: #ff7c24 !important;
    border-radius: 18px !important;
    color: #fff !important;
  }
  
  .btn-R {
    position: absolute !important;
    right: 5px !important;
    background-color: #6971ef !important;
    border-radius: 18px !important;
    color: #fff !important;
  }
  
  ::v-deep.inp-l {
    width: 100px !important;
  }
  
  ::v-deep .el-input {
    // width: 230px;
    width: 10%;
  }</style>