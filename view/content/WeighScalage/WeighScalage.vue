<template>
  <div class="header">
      <div class="table">
        <el-form
          :model="Form"
          ref="Form"
          label-width="100px"
          class="demo-ruleForm all"
        >
          <div style="display: flex">
            <el-form-item label="过磅时间:" prop="age">
              <el-date-picker
                v-model="Form.time"
                type="daterange"
                range-separator="至"
                :picker-options="pickerOptions"
                start-placeholder='选择日期'
                end-placeholder='选择日期'
                value-format="yyyy-MM-dd"
                clear-icon="el-icon-circle"
              >
              <!-- HH:mm:ss -->
              </el-date-picker>
            </el-form-item>
            <el-form-item label="关键词:" prop="age">
              <el-input
                v-model.number="Form.skyName"
                autocomplete="off"
                placeholder="流水号/车牌号"
              ></el-input>
            </el-form-item>
            <el-form-item label="收货单位:" prop="age">
              <!-- <el-input
                v-model.number="Form.danwei"
                autocomplete="off"
                placeholder=""
              ></el-input> -->
              <el-select v-model="Form.danwei" placeholder="请选择状态" class="length">
              <el-option :label="item.unitName" :value="item.id" v-for="item in danweiList" :key="item.id"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <div class="btn-s" @click="selectLook" style="display: flex;justify-content: center;align-items: center;">
                <div class="h_f"><img src="@/assets/s.png" alt="" class="select"/></div>
               <div> 搜索</div>
              </div>
            </el-form-item>
          </div>
          <!-- //隐藏区域 -->
          <div style="display: flex">
            <el-form-item label="商品分类:" prop="age">
              <el-input
                v-model.number="Form.fenlei"
                autocomplete="off"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select v-model="Form.start" placeholder="请选择状态" class="length">
                  <el-option label="已支付" value="已支付"></el-option>
                  <el-option label="未支付" value="未支付"></el-option>
                
            </el-select>
            </el-form-item>
            <el-form-item label="地磅设备:" prop="age">
              <el-select v-model="Form.shebei" placeholder="请选择设备" class="length">
              <el-option :label="item.deviceName" :value="item.deviceId" v-for="item in shebeiList" :key="item.deviceId"></el-option>
            </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div style="width: 98%; margin: 0 auto">
          <el-table
             :data="tableData"
             :cell-class-name="addClass"
            :header-cell-style="{ background: '#E4E4E4' }"
            border
            style="width: 100%; text-align: center"
          >
            <el-table-column
              prop="serialNo"
              label="流水号"
              align="center"
             
            >
            <template slot-scope="scope">
              <span class="cheColor"   @click="cehbian(scope.row)">{{ scope.row.serialNo }}</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="firstWeighingTime"
              label="过磅时间"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="deviceName" label="地磅设备" align="center">
            </el-table-column>
            <el-table-column prop="goods" label="物资小类" align="center">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="物资大类"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="realWeight" label="实重" align="center">
            </el-table-column>
            <el-table-column prop="quantity" label="框数" align="center">
            </el-table-column>
            <el-table-column
              prop="changeMethod"
              label="收费方式"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="unitPrice" label="过磅单价" align="center">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="过磅费(元)"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="payState" label="支付状态" align="center">
              <template slot-scope="scope">
              <span :class="{ active: scope.row.payState == '未支付' }" v-if="scope.row.payState == '未支付'"
                >未支付</span>
              <span :class="{ active:scope.row.payState == '已支付'}" v-else>已支付</span>
              </template>
            </el-table-column>
            <el-table-column prop="weigher" label="过磅员" align="center">
            </el-table-column>
            <el-table-column
              prop="consigneeName"
              label="收费单位"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="carNumber" label="车辆" align="center">
            </el-table-column>
            <el-table-column prop="goodsOrigin" label="货源产地" align="center">
            </el-table-column>
          </el-table>

          <!-- 侧边 -->
          <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false"
            :before-close="handleClose"
            size="660px"
            class="drawer"
          >
            <div style="width: 100%"  :data="datalist"> 
              <div class="big-box">
                <span class="xiangqing">过磅详情</span>
                <i @click="del"
                  ><img src="@/assets/del.png" alt="" class="del"
                /></i>
              </div>
              <div class="guobang">
                <span class="icont"></span>
                <div class="title-r">基本情况</div>
                <div class="txt">
                  <span class="liu">流水号：{{this.datalist.serialNo }}</span>
                  <span class="mao">毛重：{{ this.datalist.grossWeight }}kg</span>
                  <span>过磅设备：{{ this.datalist.deviceName }}</span>
                  <span class="mao">皮重：{{ this.datalist.tareWeight }}kg</span>
                  <span>过磅时间：{{this.datalist.firstWeighingTime }}</span>
                  <span class="mao">净重：{{this.datalist.netWeight }} kg</span>
                  <span>车辆车牌：{{ this.datalist.carNumber }}</span>
                  <span class="mao">实重：{{ this.datalist.realWeight }}kg</span>
                  <span>司机信息：</span>
                  <span class="mao">框数：{{ this.datalist.quantity }}框</span>
                  <span>物质大类：{{  this.datalist.categoryName }} </span>
                  <span>收费方式：{{ this.datalist.changeMethod }}</span>
                  <span>物质小类：{{  this.datalist.goods }}</span>
                  <span>过磅单价：{{ this.datalist.unitPrice }}</span>
                  <span>收货单位：{{  this.datalist.consigneeName }}</span>
                  <span class="liu">过磅费：{{  this.datalist.amount }}</span>
                  <span>货源产地：{{ this.datalist.goodsOrigin }}</span>
                  <span class="liu">过磅员：{{ this.datalist.weigher}}</span>
                </div>
              </div>

              <div class="guobang">
                <span class="icont"></span>
                <div class="title-r">支付情况</div>
                <div class="zhifu">
                  <span>支付方式：{{  this.datalist.payMethod }}</span>
                  <span>支付状态：{{  this.datalist.payState }}</span>
                  <span>支付金额：{{  this.datalist.amount }}</span>
                  <span>支付时间：{{  this.datalist.payTime }}</span>
                  <span>订单编号：{{  this.datalist.orderNo }}</span> 
                </div>
              </div>
              <div class="guobang">
                <span class="icont"></span>
                <div class="title-r">过磅照片</div>
                <div class="cont">
                  <div class="imgs">
                    <img :src="`http://smart.yinuoerp.com:9103+/Files/+ this.datalist.firstWeighingPic`" alt="" class="size-img" />
                  </div>
                  <div class="imgs">
                    <img :src=" this.datalist.secondWeighingPic" alt="" class="size-img" />
                  </div>
                  <div class="imgs">
                    <img  :src=" this.datalist.firstWeighingPic"  alt="" class="size-img" />
                  </div>
                  <div class="imgs">
                    <!-- <img src="@/img/11.png" alt="" class="size-img" /> -->
                  </div>
                </div>
              </div>
              <div class="guobang">
                <span class="icont"></span>
                <div class="title-r">预约记录</div>
                <div  class="zhifu kong"  v-show="this.datalist.appointId==0"><el-empty :image="require('@/assets/0001.png')"></el-empty></div>
                <div class="zhifu"  v-show="this.datalist.appointId!=0">
                  <span>司机姓名：</span>
                  <span>货源产地：{{  this.datalist.goodsOrigin}}</span>
                  <span>联系电话：</span>
                  <span>预约日期：</span>
                  <span>收货单位: {{  this.datalist.consigneeName }}</span>
                  <span>运输物质：{{  this.datalist.categoryName }}:{{  this.datalist.goods }}</span>
                  <span>预约备注：</span>
                </div>
                <div  v-show="this.datalist.appointId!=0">
                  <p class="p">预约来源：</p>
                  <p class="p">预约审批：</p>
                </div>
              </div>
            </div>
          </el-drawer>
        </div>
        <!-- 页数 -->
        <div class="block">
          <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout=" prev, pager, next, jumper,sizes,total" :total=this.tableData.length>
          </el-pagination>
        </div>
      </div>
  </div>
</template>
  
<script>

import { guobangList, select,liebiao } from "@/api/login";
export default {
  data() {
    return {
      pageSize:5,
      pageSizes:[5,10,15],
      currentPage:1,
      start: 1,
      drawer: false,
      opens: 2,
      tody:'',
      todys:'',
      Form: {
        time:["2012-01-01","2012-01-01"],
        skyName: "",
        danwei: "",
        fenlei: "",
        start: "",
        shebei: "",
      },
      restaurants: [],
      state1: "",
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              picker.$emit('pick', new Date());
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData:[],
      datalist:[],
      danweiList:[],
      shebeiList:[]
    };
  },
  components: {
  
  },
  mounted() {
    // this.list()
    liebiao().then((res)=>{
      console.log(res,'liebiao');
      console.log(res.data.ResData.deviceList);
      this.shebeiList=res.data.ResData.deviceList
      this.danweiList=res.data.ResData.consigneeList

    })
   
  },
  created(){
  this.defaultDate()
  },
  methods: {
    defaultDate(){
        let date = new Date()
        let year = date.getFullYear().toString();
        let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString();
        let da = date.getDate() < 10 ? '0'+date.getDate().toString():date.getDate().toString();
        let end = year + '-' + month + '-' + da;
        let beg = year + '-' + month + '-' + da;
        this.Form.time= [beg,end] //将值设置给插件绑定的数据
        console.log(this.Form.time[0],'3213');
      },

    handleSizeChange(val) {       
      this.currentPage = 1;
      this.pageSize = val;
      this.guobangList();
    },
    //切换当前页
    handleCurrentChange(val) {    
      this.currentPage = val;
      this.guobangList();
    },
    cehbian(row){
      this.drawer=true
      guobangList({
      id:row.id,
    }).then((res) => {
      console.log( this.tableData);
      this.datalist=res.data.ResData
    })
      console.log('23333');
    },
    selectLook() {
      select({
        page: "1",
        keyword: this.Form.skyName,
        paystate: this.Form.start,
        time1: this.Form.time[0],
        time2:this.Form.time[1],
        consigneeId: this.Form.danwei,
        deviceId: this.Form.shebei,
        goods: this.Form.fenlei,
      }).then((res) => {
        this.tableData =res.data.ResData.data
       
        console.log(res.data.ResData);
      });
    },
    del() {
      this.drawer = false;
    },
    // handleClose(done) {
    //   this.$confirm("还有未保存的工作哦确定关闭吗？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },

    addClass(columnIndex) {
      if (columnIndex == 0) {
        return 1;
      }
    },
    open() {
      this.opens += 1;
      if (this.opens > 2) {
        this.opens = 1;
      }
    },

    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>
<style lang="less" scoped>
.h_f{
// height: 44px;
margin-top: 10px;
}
::v-deep .el-icon-time:before { 
    content: "";
}
::v-deep .el-button.is-disabled.is-plain, .el-button.is-disabled.is-plain:focus, .el-button.is-disabled.is-plain:hover{
  background-color: #6971ef !important;
}
::v-deep .el-button--text{
  color: #666666 !important;
  background-color: #6971ef !important;
}
::v-deep [data-v-257a3854] .el-select .el-input .el-select__caret{
  right: 0px;
  top: 0px;
}
::v-deep [data-v-257a3854].el-date-editor .el-range-input {
  margin-top: 0px;
  width: 44%;
}
.cheColor{
  color: #6971ef;
  cursor: pointer;
}
.cont {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.title-r {
  border-bottom: 1px solid #e4e4e4;
  height: 60px;
  padding-left: 35px;
  font-size: 18px;
  line-height: 60px;
  background: #fafafa;
}

.guobang {
  margin: 20px auto;
  width: 620px;
  // height: 190px;
  border: 1px solid #e4e4e4;
  border-radius: 4px 4px 0 0;
  position: relative;
}

::v-deep .el-drawer {
  width: 660px !important;
}

.com-h {
  margin: 20px auto;
  width: 620px;
  height: 177px;
  border: 1px solid #e4e4e4;
  border-radius: 4px 4px 0 0;
  position: relative;
}

.mao {
  padding-left: 50px;
}

.liu {
  padding-left: 35px;
}

.jibtn {
  border-bottom: 1px solid #e4e4e4;
  height: 60px;
  padding-left: 35px;
  font-size: 18px;
  line-height: 60px;
  background: #fafafa;
}

.con {
  margin: 0 auto;
  width: 620px;
  height: 373px;
  border: 1px solid #e4e4e4;
  border-radius: 4px 4px 0 0;
  position: relative;
}

.xiangqing {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
}

.big-box {
  margin: 20px auto;
  width: 620px;
  position: relative;
}

.left-l {
  margin-left: -47px;
}

.select {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.left-l {
  margin-left: -47px;
}

::v-deep .el-form-item__content {
  margin-left: 120px !important;
}

::v-deep [data-v-257a3854] .el-form-item__label {
  width: 100px !important;
}

.imgs {
  width: 20px !important;
  height: 20px !important;
  margin-top: 10px;
}
::v-deep .el-select .el-input .el-select__caret {
  right: 20px;
  position: absolute;
  top: -6px;
}

::v-deep .el-pagination__jump .el-input__inner {
  width: 50px;
}

::v-deep .el-pagination__editor.el-input {
  width: 50px;
  height: 30px;
}

::v-deep .el-pagination .el-select .el-input .el-input__inner {
  width: 100px;
  height: 30px;
}

.block {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
::v-deep .el-button{
  padding:0px;
}
.inline-input {
  margin-left: 47px !important;
}

.title {
  color: #373737;
  font-size: 18px;
  font-weight: bold;
}

.active {
  color: #f56c6c;
}

.active2 {
  color: #67c23a;
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
  top: 20px;
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
.kong{
  display: flex;
  justify-content: center;
  align-items:center;
}
.zhifu {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.zhifu span {
  font-size: 16px;
  display: block;
  color: #666666;
  width: 43%;
  // padding: 0 20px;
  margin: 10px 20px;
  line-height: 28px;
}

.txt {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // margin-top: 20px;
}

.txt span {
  width: 46%;
  padding-left: 20px;
  font-size: 16px;
  color: #666666;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  line-height: 28px;
}

.addColor {
  color: red;
}

::v-deep .el-form-item__label {
  color: #666666 !important;
}


.icon-l img {
  width: 10px;
  height: 6px;
}

.icon-l {
  top: 0px;
  right: 10px;
  z-index: 1;
  position: absolute;
}

.btn-s {
  width: 80px;
  display: block;
  color: #fff;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 18px !important;
  background-color: #6971ef !important;
}

::v-deep .el-date-editor .el-range-separator {
  width: 10%;
}

::v-deep.el-date-editor .el-range-input {
  width: 26%;
}

.mose {
  width: 100px;
  margin-left: 10px;
  color: #ffffffc0;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
  margin-left: -15px;
}

// ::v-deep .el-form-item{
//   // margin-bottom: 10px;
// }
::v-deep .el-date-editor .el-range__close-icon {
  margin-bottom: 10px;
  margin-left: 10px;
}

::v-deep .el-button {
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 0px;
  border: 0;
  border-radius: 0px;
}

::v-deep .el-col-12 {
  width: 130%;
}

::v-deep .el-input__inner {
  position: relative;
  height: 40px;
}

.contair {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
}

.header {
  width: 100%;
  height: 100%;
  flex: 1;
}

::v-deep .el-input__inner {
  width: 235px;
}

.all {
  display: flex;
  //
  flex-direction: column;
  padding-top: 10px;
}

.btn {
  display: flex;
  margin-top: -9px;
}
</style>