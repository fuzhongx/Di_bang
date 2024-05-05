<template>
    <div id="hometree" class="echa"></div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  
  export default {
      props:['dan'],
      data(){
          return{
            danweiList:''
          }
      },
      created(){
        
      },
      mounted(){
      this.showfei()
    },
    methods:{  
     showfei(date, value) {
      var chartDanweis = document.getElementById("hometreefei");
      var Chartss = echarts.init(chartDanweis);
      Chartss = echarts.init(document.getElementById('hometreefei'));
      var option;

      if (this.danweiList.length==0) {  
        option = {
          title: {
          text: '收货单位过磅统计排行榜',
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
    }else{
      var option = {
        backgroundColor: '#fff',
        title: {
          text: '收货单位过磅统计排行榜',
          x: 'left',
          y: 'top',
          textStyle: {
            //color: 'black'
            fontSize: 15,
          },
        },
        graphic:[{
            type:"image",
            left:'centre',
            top:'center',
            style:{
              image:'/',
              width:130,
              height:'130'
            }
          }
          ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (siez, ticket, callback) {
                var htmlStr = '';
                for(var i=0;i<siez.length;i++){
                    var siez = siez[i];
                    var xName = siez.name;//x轴的名称
                    var seriesName = siez.seriesName;//图例名称
                    var value = siez.value;//y轴值
                    var color = siez.color;//图例颜色
                    if(i===0){
                        //  htmlStr += '笔数：' + value + '笔<br/>';
                          htmlStr += '<div style="font-size:12px;color:#9F9F9F; text-align: center;">' + xName + '</div>';
                          htmlStr += '<div style="font-size:14px;color:block; text-align: center;">过磅吨数：' + value + 'kg</div>';
                        //  htmlStr +='时间：' + xName + '<br/>';//x轴的名称
                    }
                    htmlStr +='<div>';
                    htmlStr += '</div>';
               
                     return htmlStr;
                }
          
                },      
          
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          top: '13%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: val.data,
          axisTick: {
            show: false
          },
          legend: {
            width: "60%"
          },
          axisLine: {
            lineStyle: {
               
            }
        },
        axisTick: {  //设置刻度线样式为不显示
            show: false
        },
       
   
          axisLabel: {
            interval: 0,
            // rotate: 40,
            fontSize: 10,
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          },
        },

        yAxis: {
          type: 'value',
          // splitLine:false,
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(0,0,0,0.3)',
              // width:0.5
            }
          },
          axisLabel: {}
        },
        series: [{
          name: '3',
          type: 'bar',
          barWidth: '4%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#248ff7'
              }, {
                offset: 1,
                color: '#6851f1'
              }
            ]
              ),
              barBorderRadius:[20,20,0,0],
              label: {
                show: true,
                textStyle: {
                  color: "#000"
                },
                position: "top",
              }
            }
          },
          data:val.value
        }]
      };
    }
     
      option && Chartss.setOption(option);
      // }) 
     
    },
    }
  }
  </script>
  
  <style lang="less" scoped>
  .echa{
      width: 810px;
      height: 300px;
  }
  </style>