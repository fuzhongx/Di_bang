<template>
  <div id="totalls" class="totals" ></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      arr:{},
      hash:[],
      size:[]
    }
  },
  props: ['shuzu'],
  mounted() {
    this.guobangshowfei()
    eventBus.$on('eventBusName', function(val) { })
  },
  created() {
  
  },
  methods: {
    guobangshowfei(hash,size) {
      this.$nextTick(()=>{
      var bangl = document.getElementById("totalls");
      var Chartl = echarts.init(bangl);
      var option;
        option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (siez, ticket, callback) {
            var htmlStr = '';
            for (var i = 0; i < siez.length; i++) {
              var siez = siez[i];
              var xName = siez.name;//x轴的名称
              var seriesName = siez.seriesName;//图例名称
              var value = siez.value;//y轴值
              var color = siez.color;//图例颜色
              if (i === 0) {
                //  htmlStr += '笔数：' + value + '笔<br/>';
                htmlStr += '<div style="font-size:12px;color:#9F9F9F; text-align: center;">' + xName + '</div>';
                htmlStr += '<div style="font-size:14px;color:block; text-align: center;">过磅吨数：' + value + 'kg</div>';
                //  htmlStr +='时间：' + xName + '<br/>';//x轴的名称
              }
              htmlStr += '<div>';
              htmlStr += '</div>';

              return htmlStr;
            }

          },
        },
        legend: {

        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '15%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          //=====================
          data:hash,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'transparent'
            },
            axisTick: {  //设置刻度线样式为不显示
              show: false
            },
          },

        },
        yAxis: {
          type: 'value',
          name: "(单位)元",
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },

        },
        series: [
          {

            type: 'line',

          },
          {
// -----------------------------------------
            type: 'line',
            data:size,
            markPoint: {

            },
            itemStyle: {
              normal: {
                color: '#fff',
                fontSize: 14,
                lineStyle: {
                  width: 5, //折线宽度

                  //折线颜色渐变
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#67C23A'
                  },
                  {
                    offset: 1,
                    color: '#67C23A'
                  }])
                }
              },
              emphasis: {   //鼠标经过时折点小圆圈样式
                borderColor: '#67C23A',
                borderWidth: 10
              }
            },
          }
        ]
      }
      option && Chartl.setOption(option);
      // })
    });
    },
  }

}
</script>

<style lang="less" scoped> .totals {
   width: 1620px;
   height: 300px;
 }
</style>