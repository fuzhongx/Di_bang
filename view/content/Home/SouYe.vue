<template>
  <div class="header">
    <div class="top">
      <el-card class="box-card top-l">
        <div slot="header" class="clearfix ">
          <WeEchart></WeEchart>
        </div>
      </el-card>
      <el-card class="box-card top-r">
        <div slot="header" class="clearfix top-r-t">
          <div class="top-r-top">
            <p>最新过磅车辆</p>
            <p class="look" @click="look" style="color: #6971ef;">查看全部</p>
            <p><i><img src="@/assets/99.png" alt=""  class="jiantou_r"></i></p>
          </div>
          <div v-show="this.tableData.length===0" class=" flages">
            <img :src="require('@/assets/0001.png')" alt="">
          </div>
          <div class="top-r-mid" v-show="this.tableData.length!==0" >
            <img src='https://img1.baidu.com/it/u=983484722,1613543453&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500' alt=""
              class="imgs-m" />
          </div>
          <div class="top-r-down" :data="tableData"  v-show="this.tableData.length!==0" >
            <div class="shu">
              <span>{{ this.tableData.carNumber }}</span>
              <span>{{ this.tableData.firstWeighingTime }}</span>
            </div>
            <div> 
            </div>
            <div class="content-mid">
              <div class="shoufei">按吨收费</div>
              <div style="display:flex;justify-content: space-evenly;width: 100%;;">
                <div class="comt-text-mid">
                  <p> <span class="shuzi">{{ this.tableData.unitPrice}}</span> <span class="yuan">元/吨</span> </p>
                  <p class="danjia">单价</p>
                </div>
                <div class="comt-text-mid">
                  <p> <span class="shuzi">{{  this.tableData.realWeight }}</span> <span class="yuan">吨</span> </p>
                  <p class="danjia">重量</p>
                </div>
                <div class="comt-text-mid">
                  <p> <span class="shuzi">{{ this.tableData.totalPrice }}</span> <span class="yuan">元</span> </p>
                  <p class="danjia">过磅费</p>
                </div>
              </div>
            </div>
            <div class="top-r-down-text shop">
              <p>商品： {{ this.tableData.categoryName }}</p>
              <p>商户： {{this.tableData.consigneeName}}</p>
              <p>供货商：{{ this.tableData.goods }}</p>
            </div>
          </div>
        </div>
      </el-card>

    </div>
    <el-card class="box-card down">
      <div slot="header" class="clearfix">
        <div class="down-t">
          <p class="shuju">今日称重数据</p>
          <p @click="look" class="look"  style="color: #6971ef;">查看更多</p>
          <p><i><img src="@/assets/99.png" alt=""  class="jiantou_d"></i></p>
        </div>
        <div v-show="this.tableData.length===0" class="down_flage">
            <img :src="require('@/assets/0001.png')" alt="">
          </div>
        <div v-show="this.tableData.length !==0">
          <el-table :data="tableData" max-height="300" :header-cell-style="{ background: '#E4E4E4' }" border
            style="width: 100%; text-align: center">
            <el-table-column fixed prop="serialNo" label="流水号" align="center">
              <span style="color: #6971ef;">2023020512</span>
            </el-table-column>
            <el-table-column prop="firstWeighingTime" label="过磅时间" align="center">
            </el-table-column>
            <el-table-column prop="deviceName" label="地磅设备" align="center"> </el-table-column>
            <el-table-column prop="goods" label="物资小类" align="center"> </el-table-column>
            <el-table-column prop="categoryName" label="物资大类" align="center"> </el-table-column>
            <el-table-column prop="realWeight" label="实重" align="center"> </el-table-column>
            <el-table-column prop="quantity" label="框数" align="center"> </el-table-column>
            <el-table-column prop="changeMethod" label="收费方式" align="center"> </el-table-column>
            <el-table-column prop="unitPrice" label="过磅单价" align="center"> </el-table-column>
            <el-table-column prop="totalPrice" label="过磅费(元)" align="center"> </el-table-column>
            <el-table-column prop="payState" label="支付状态" align="center">
              <span :class="{ 'active': start == 1 }" v-if="start == 1">未支付</span>
              <span :class="{ 'active': start == 2 }" v-else>已支付</span>
            </el-table-column>
            <el-table-column prop="weigher" label="过磅员" align="center"> </el-table-column>
            <el-table-column prop="consigneeName" label="收费单位" align="center"> </el-table-column>
            <el-table-column prop="carNumber" label="车辆" align="center"> </el-table-column>
            <el-table-column prop="goodsOrigin" label="货源产地" align="center"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

import {
  userLise,
  Home
} from "@/api/login"
import WeEchart from '@/components/echarts/WeEchart.vue'
export default {
  data() {
    return {
      start: 1,
      homeList: {},
      tableData:[],
    };
  },
  mounted() {
    Home().then((res)=>{
      console.log(res.data.ResData.data,'33333');
      this.tableData=res.data.ResData.data
      console.log(res,'8888888');
    })
    userLise().then((res) => {
      console.log(res.data.ResData.company);
      this.homeList=res.data.ResData.company
    })
  },
  methods: {
    look() {
      this.$router.push("/WeighScalage");
    },
  },
  components: {
    WeEchart
  }
};
</script>

<style lang='less' scoped>
.jiantou_d{
  width: 18px;height: 18px;
  margin-top: 7px;
  margin-left: 20px;
}
.jiantou_r{
  width: 18px;height: 18px;
  margin-top: 2px;
}
.down_flage{
  width: 100px;
  height: 100px;
  // margin: 50px auto;
}
.flages{
  width: 200px;
  // height: 200px;
  // margin: 100px  auto;
}
.danjia {
  font-size: 16px;
  color: #373737;
  margin-left: 10px
}

.yuan {
  font-size: 15px;
  font-weight: bold;
  color: #373737;
}

.shuzi {
  font-size: 20px !important;
  font-weight: bold;
  color: #373737
}

.shoufei {
  line-height: 40px;
  font-size: 16px;
  color: #373737;
  padding-left: 20px;
}

.shu {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
}

.shuju {
  font-size: 18px;
  margin-top: 15px;
}

.look{
  cursor: pointer;
  color: #6971EF;
  font-size: 15px;
  position:absolute;
  right: 58px;
}

.clearfix {
  height: 100%;
  // margin-top: -18px;
}

::v-deep .el-card__header {
  border-bottom: 0px !important;
  width: 100%;
  height: 100%;
}

.active {
  color: #F56C6C;
}

.active2 {
  color: #67C23A;
}

.comt-text-mid {
  width: 33%;
  text-align: center;
}

.comt-text-mid p {
  margin: 0px;
}

.content-mid {
  width: 100%;
  // height: 120px;
  background: linear-gradient(180deg, #FCFDFF 0%, #F6F6FF 100%);
  margin: 0 auto;
}

::v-deep .el-form-item {
  margin-bottom: 0px;
  color: #f6f6fd;
}

img {
  height: 100%;
  width: 90%;
}

.top-r-mid {
  width: 100%;
  height: 37%;
}

.imgs-m {
  width: 100%;
}

.shop {
  margin-top: 20px;
}

.top-r-down-text {
  height: 10%;
}

.top-r-down-text p {
  color: #666666;
  font-size: 16px;
  line-height: 20px;
}

.top-r-top {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  // margin-top: 20px;
}

.top-r-top p:nth-child(1) {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px !important;
}

.top-r-top p:nth-child(2) {
  color: rgb(44, 132, 247);
}

.top-r-down span:nth-child(1) {
  color: #373737;
  font-size: 24px;
}

.top-r-down span:nth-child(2) {
  color: #999999;
  font-size: 16px;
}

::v-deep .el-table th.el-table__cell>.cell {
  // font-family: "黑体" !important;
  // font-weight: bold;
  color: black;
}

.down-t {
  display: flex;
  justify-content: space-between;
}

.down-t p:nth-child(1) {
  font-family: "黑体";
  font-weight: bold;
}

.down-t p:nth-child(2) {
  color: rgb(44, 132, 247);
  cursor: pointer;
}

.top {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.top-l {
  background-color: #fff;
  width: 70%;
  height:65%;
  border-radius: 2px;
}
.top-r {
  width: 30%;
  background-color: #fff;
  border-radius: 2px;
}

.down {
  height: 30%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 2px;
}

.header {
  width: 100%;
  height: 100%;
}</style>