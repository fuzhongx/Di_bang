<template>
  <div class="all">
      <div><h3 class="header-t">称重数据</h3></div>
    <div class="top">
      <div class="home-box bg-one ">
        <div class="mid-r" :data="todayList">
          <span class="day">今日过磅毛重</span>
          <span class="tes">{{this.todayList.todayWeight }}<span class="dun">吨</span></span
          >
        </div>
      </div>
      <div class="home-box bg-one ">
        <div class="mid-r">
          <span class="day">今日过磅车次</span>
          <span class="tes">{{this.todayList.todaycnt }}<span class="dun">次</span></span
          >
        </div>
      </div>
      <div class="home-box bg-tree">
      <div class="mid-r">
          <span class="day">今日过磅收费</span>
          <span class="tes">{{this.todayList.amount }}<span class="dun">元</span></span
          >
        </div>
      </div>
      <div class="home-box bg-four">
        <div class="mid-r">
          <span class="day">今日过磅次数</span>
          <span class="tes">{{this.todayList.sumCnt }}<span class="dun">次</span></span
          >
        </div>
      </div>
    </div>
    <div class="tongji">
      称重统计<span  class="jin">(近7日)</span>
    </div>
    <div id="main" class="biao"></div>
  </div>
</template>

<script>
import {Home} from '@/api/login'
import * as echarts from "echarts";
export default {
  data(){
    return{
      todayList:[],
      lineList:[],
      tableData:[]
    }
  },
  mounted() {
    this.showt();
    Home().then((res)=>{
      console.log(res,'888');
      this.tableData=res.data.ResData.Data
      this.lineList=res.data.ResData.lineData
      this.todayList=res.data.ResData.todayData
      console.log(res.data.ResData.todayData);
      let hash=[];
      let size=[];
      this.lineList.map((item)=>{
           hash.push(item.date)
           size.push(item.value)
      })
      this.showt(hash,size);
    })
  },
  methods: {
    showt(hash,size) {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "",
        },
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B",
            },
          },
        },
        legend: {
          data: ["time"],
        },
        grid: {
          left: "0%",
          right: "2%",
          bottom: "0%",
          top: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          interval:1,
          data:hash
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color:'#E4E4E4',
            }
          },
          // lineStyle:{
          //   color:'#D1D1D1',
          //   type: 'dashed'
          // }
        },
        visualMap: {
          type: "piecewise",
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 0,
              lt: 8,
              color: "rgba(0, 135, 185, 0.11)",
            },
          ],
        },
        series: [
          {
            type: "line",
          //   itemStyle:{
          //   color:'#6c50f3'
          // },
            smooth: 0.6,
            symbolSize:20,
            // symbol: "circle",
            // lineStyle: {
            //   color: new this.$echarts.graphic.LinearGradient(0, 0,0,1,
            //     //三种由深及浅的颜色
            //       [
            //       {
            //         offset: 0,
            //         color: "rgb(57, 54, 233)",
            //       },
            //       {
            //         offset: 1,
            //         color: "#fff",
            //       },
            //     ]
            //   ),
            //   width: 3,
            // },
            itemStyle:{
              color:'rgb(57, 54, 233)',
              opacity:0
            },
            markLine: {
              symbol: ["none", "none"],
              label: { show: false },
              // data: [{ xAxis: 1 }]
            },
            areaStyle: {
              type: "linear",
              //渐变色实现===
              color: new this.$echarts.graphic.LinearGradient( 0, 0,0, 1,
                //三种由深及浅的颜色
                [
                  {
                    offset: 0,
                    color: "rgb(171, 220, 243)",
                  },
                  {
                    offset: 1,
                    color: "#ffffff",
                  },
                ]
              ),
            },
            data:size
          },
        ],
      };
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-card__header{
  padding: 20px !important;
}
.jin{
  font-size: 12px;font-weight: bold; color: #373737;
}
.biao{
 width: 100%;
 height: 100%;
 margin: 20px auto;
}
.tongji{
 font-weight: bold; font-size: 18px;color: #373737;
}
.dun{
  font-size: 15px;
  margin-left: 10px;
}
.tes{
  font-size: 26px;
}
.day{
  font-size: 15px ;margin-bottom: 10px;
}
.top{
margin-bottom: 30px; display: flex; justify-content: space-evenly;
}
.all{
  width: 100%;
  height: 100%;
}
.home-box{
  width: 25%;
  height: 110px;
  color: #fff;
  margin: 0 10px;
}
.bg-one{
  background-image: url('@/assets/one.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bg-two{
  background-image: url('@/assets/two.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bg-tree{
  background-image: url('@/assets/tree.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bg-four{
  background-image: url('@/assets/four.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.mid-r {
  display: flex;
  flex-direction: column;
  padding:20px;
}
.icob-l {
  margin-top: 5px;
}
.logo {
  width: 30px;
  height: 30px;
}
.icon {
  font-size: 50px;
  color: rgb(57, 54, 233);
  margin-top: 20px;
}
.mid-l {
  margin-left: 20px;
}
.header-t {
  font-weight: bold;
  color: #373737;
  font-size: 18px;
}
</style>