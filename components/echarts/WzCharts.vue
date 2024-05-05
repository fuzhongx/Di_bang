<template>
    <div id="boxs" class="wzhi"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data(){
        return{
            bangList:'',
        }
    },
    mounted() {
        this.wuzishowfei()
    },
    methods: {
    wuzishowfei(numlist) {
      var chartDomwuzi = document.getElementById("boxsfei");
      var myChartwuzi = echarts.init(chartDomwuzi);
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
            // data: [
            //     { value: 0, name: '季节水果' },
            //     { value: 0, name: '常规水果' },
            //     { value: 0, name: '蔬菜' },]
            //     { value: 30, name: '肉类' },
            //     { value: 28, name: '海鲜' },
            //     { value: 26, name: '干货' },
            //     { value: 22, name: '调料' },
            //     { value: 18, name: '蛋' }
            // ]
            data: numlist
          }
        ]
      }
      };
      option && myChartwuzi.setOption(option);
    },
    }
}
</script>

<style lang="less" scoped>
.wzhi {
    width: 810px;
    height: 300px;
}
</style>