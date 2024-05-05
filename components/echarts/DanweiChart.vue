<template>
  <div id="hometwos" class="echa"></div>
</template>

<script>
// import {danweiList, tongji} from '@/api/login'
import * as echarts from "echarts";

export default {
	props:['danweiList'],
	data(){
		return{
			danweiList:''
		}
	},
    mounted(){
    this.oshow()
  },
  methods:{
	oshow(numlist) {
      var chartDomtwo = document.getElementById("hometwos");
      var myCharttwo = echarts.init(chartDomtwo);
      // myChart.setOption(this.option)
      // window.addEventListener("resize",function(){
      //   myChart.resize()
      // })
      var option;
      if (this.bangList.length == 0 ) {  
        option = {
          title: {
          text: '物资过磅分布',
          x: 'left',
          y: 'top',
          textStyle: {
            //color: 'black'
            fontSize: 15,
          }
        },
          graphic:[{
            type:"image",
            left:'center',
            top:'center',
            style:{
              image:require('@/assets/0001.png'),
              width:130,
              height:'130'
            }
          }
          ],
        }
    }else  {
       option = {
        title: {
          text: '物资过磅分布',
          x: 'left',
          y: 'top',
          textStyle: {
            //color: 'black'
            fontSize: 15,
          }
        },
        graphic:[{
            type:"image",
            left:'centre',
            top:'center',
            style:{
              image:'@',
              width:130,
              height:'130'
            }
          }
          ],
        legend: {
          // top: 'bottom',
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          // data: data.legendData
        },
        // legend: {
        //     width:"50%"
        // },
        tooltip:{
          // trigger:'axis',
          show:true     
           },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            // radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: numlist
          }
        ]
      }
      };
      option && myCharttwo.setOption(option);
    },
  }
}
</script>

<style lang="less" scoped>
.echa{
    width: 1080px;
	height: 400px;
}
</style>