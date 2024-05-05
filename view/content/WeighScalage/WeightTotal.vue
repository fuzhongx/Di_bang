<template>
  <div class="header">
      <div class="table">
        <el-form :model="Form" ref="Form" label-width="100px" class="demo-ruleForm all">
          <div style="display: flex">
            <el-form-item label="过磅时间:" prop="age">
              <!-- <i class="icon-l"><img src="@/img/data.png" alt="" class="imgs" /></i> -->
              <el-date-picker v-model="from.time" 
                type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" clear-icon="el-icon-circle"  value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="收货单位:" prop="age">
              <el-select v-model="from.danwei"  placeholder="请选择" class=" fenlei"
               multiple
               collapse-tags
               @change="wanwei"
              >
                <el-option v-for="item in shuiList" :key="item.id" :label="item.unitName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="btn-s" @click="selectbtn" style="display: flex;justify-content: center;align-items: center;">
                <div style="height: 44px;"><img src="@/assets/s.png" alt="" class="select" /></div>
                <div>搜索</div>
              </div>
              <el-button class="atn" @click="atn">下载过磅明细</el-button>
            </el-form-item>
          </div>

          <!-- //隐藏区域 -->
          <div style="display: flex">
            <el-form-item label="商品分类:" prop="age">
              <el-select v-model="from.shangpin"  placeholder="请选择" class=" fenlei" @change="daleis"
              multiple
               collapse-tags
              >
                <el-option v-for="item in li" :key="item.itemName" :label="item.itemName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆信息:" prop="age">
              <!-- <el-select v-model="from.xinxi"  placeholder="请选择" class=" fenlei">
                <el-option v-for="item in li" :key="item.itemName" :label="item.itemName" :value="item.itemName">
                </el-option>
                </el-select> -->
                <el-input v-model.number="from.xinxi" autocomplete="off" placeholder="车辆信息" class=" fenlei"></el-input>
            </el-form-item>
          </div>

        </el-form>
      </div>
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="过磅吨数" name="first" class="tab-s">
          <div class="total">
            <div class="top-c" id="total"></div>
            <div>
            <div class="down-c">
              <div  class="left" id="home" ></div>
              <div class="right" id="box"></div>
            </div>
          </div>
          </div>
        </el-tab-pane>
           <el-tab-pane label="过磅框数" name="second" class="tab-s"> 
          <div class="total" id="totall" style="width:2160px;height: 400px;"></div>
            <div class="down-c">
              <div  class="left"  id="hometwo" style="width: 1080px;height: 400px;"></div>
               <div  class="right" id="boxtwo" style="width: 1080px;height: 400px;"></div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="过磅费" name="tree">
          <div class="total" id="totalls" style="width:2160px;height: 400px;"></div>
          <!-- <div class="total" id="totall" style="width:2160px;height: 400px;"><TotalEcharts :lineList="shuzu"></TotalEcharts></div> -->
            <div class="down-c">
              <div  class="left"  id="hometreefei" style="width: 1080px;height: 400px;"></div>
              <div  class="right" id="boxsfei" style="width: 1080px;height: 400px;"></div>
              <!-- <div  class="left"  id="hometwo"  style="width: 1080px;height: 400px;"><DanWei :dan="danweiList"></DanWei></div> -->
               <!-- <div class="right" id="boxtwo"  style="width: 1080px;height: 400px;"><WzCharts :wuzi="bangList"></WzCharts></div> -->
            </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
  
<script>
import Papa from 'papaparse';
import * as echarts from "echarts";
import { tongji, xuanxiang, btns, logint } from '@/api/login'
import DanweiChart from '@/components/echarts/DanweiChart.vue'
import TotalEcharts from '@/components/echarts/ToEcharts.vue'
import WzCharts from '@/components/echarts/WzCharts.vue'
import DanWei from "@/components/echarts/DanWeis.vue"
export default {
  data() {
    return {
      pickerOptions: {
          shortcuts: [ {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      shuzu:{},
      shuiList: [],
      li: [],
      lineData: [],
      danweiList: [],
      tableData: [],
      bangList: [],
      from: {
        time:["2012-01-01","2012-01-01"],
        xinxi: "",
        danwei: '',
        shangpin: ''
      },
      activeName: 'first',
      start: 1,
      drawer: false,
      daiweiIds:{},
      daleiIds:{},
      opens: 2,
      Form: {
        age: "",
      },
      restaurants: [],
      state1: "",
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value1: [],
      value2: []
    };
  },

  components: {
    DanweiChart,
    WzCharts,
    TotalEcharts,
    DanWei
  },
  created(){
    this.defaultDate()
  },
  mounted() {
    this.toshow()
    this.show()
    this.oshow()
    this.danweishow()
    this.wuzishow()
    // this.numlist()
    this.guobangshow()
    this.guobangshowfei()
    this.showfei()
    this.wuzishowfei()
    // this.selectbtn()
    xuanxiang().then((res) => {
      this.li = res.data.ResData.goodsList
      this.shuiList = res.data.ResData.consigneeList
      console.log(this.li, '4646');
      console.log(this.shuiList,'kk');
      console.log(res, '000');
    })

  },
  methods: {
    changeShow(){

    },
    defaultDate(){
        let date = new Date()
        let year = date.getFullYear().toString();
        let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString();
        let da = date.getDate() < 10 ? '0'+date.getDate().toString():date.getDate().toString();
        let end = year + '-' + month + '-' + da;
        let beg = year + '-' + month + '-' + da;
        this.from.time= [beg,end] //将值设置给插件绑定的数据
        console.log(this.from.time[0],'3213');
      },
    daleis(a){
      let obj={}
      let newArr=[]
      let arr=[]
      arr.push(a)
      arr.forEach((item)=>{
        newArr=Object.values(item)
        obj=newArr.join()
        console.log(obj);
        this.daleiIds=obj
        console.log(this.daleiIds,'dalei');
      })
    },
    wanwei(row){
      let obj={}
      let newArr=[]
      let arr=[]
      arr.push(row)
      console.log(arr,'数组');
      arr.forEach((item)=>{
        newArr=Object.values(item)
        obj=newArr.join()
        console.log(obj);
        this.daiweiIds=obj
      })
    },
    atn() {
      btns(
        {
          time1: this.from.time[0],
          time2: this.from.time[1],
          carNumber: this.from.xinxi,
          consigneeIds:JSON.stringify(this.daiweiIds),
          itemIds:this.daleiIds
        }
      ).then((res) => {
        this.$message.success("正在下载中!");
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "分类表格";
        a.click();
        // 释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      })
      var csv = Papa.unparse(this.data); //data数据 这个数据是el-table中的数据
      //定义文件内容，类型必须为Blob 否则createObjectURL会报错
      let content = new Blob([csv]);//后缀
      //生成url对象
      let urlObject = window.URL || window.webkitURL || window;
      let url = urlObject.createObjectURL(content);
      //生成<a></a>DOM元素
      let el = document.createElement("a");
      //链接赋值
      el.href = url;
      el.download = "文件导出.csv";//后缀
      //必须点击否则不会下载
      el.click();
      //移除链接释放资源
      urlObject.revokeObjectURL(url);
    },

    selectbtn() {
        tongji(
        {
          time1: this.from.time[0],
          time2: this.from.time[1],
          carNumber: this.from.xinxi,
          consigneeIds:this.from.danwei,
          itemIds: this.from.shangpin
        }
      ).then((res) => {
        if(this.from.time[0]!=null&&this.from.time[1]!=null&&res.data.ResData!=null){
        this.lineData = res.data.ResData.lineData
        this.danweiList = res.data.ResData.consigneeList
        this.bangList = res.data.ResData.goodsList
        let hash = []
        let size = []
        let date = []
        let value = []
        let datew = []
        let valuew = []
        let numlist=[]
        let kunagshu=[]
        let danwei={
          value:[],
          name:[] 
         }
        let arr={
          count:[],
          hash:[]
        }
          this.bangList.forEach((item) => {
          numlist.push(item)

        })
        console.log(numlist);

        this.danweiList.forEach((item) => {
          danwei.date.push(item.name)
          danwei.value.push(item.value)
          date.push(item.name)
          value.push(item.value)
          datew.push(item.name)
          valuew.push(item.value)
          eventBus.$emit('Name', danwei); 


        })
        this.showfei(date.value)
        this.oshow(numlist)
        this.danweishow(datew, valuew)
        this.wuzishow(numlist)
        this.show(date, value)
          this.lineData.forEach((item) => {
          hash.push(item.date)
          size.push(item.weight)
          kunagshu.push(item.quantity)
          arr.count.push(item.amount)
          arr.hash.push(item.date)
        })
        this.wuzishowfei(numlist)
        this.toshow(hash, size)
        this.guobangshow(hash,kunagshu)
        this.guobangshowfei( arr.hash,arr.count)

        this.shuzu=arr
        eventBus.$emit('eventBusName', arr); 
      }else{
        alert(res.data.ErrMsg)
      }
      })
      
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "全部" }, { value: "未完成" }, { value: "已完成" }];
    },
    handleSelect(item) {
      console.log(item);
    },
    //物资
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
    oshow(numlist) {
      var chartDomtwo = document.getElementById("box");
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
    //单位
    danweishow(date, value) {
      var chartDanweitwo = document.getElementById("hometwo");
      var Charttion = echarts.init(chartDanweitwo);
      if (Charttion != null && Charttion != "" && Charttion != undefined){
        Charttion.dispose();
      }
      Charttion = echarts.init(document.getElementById('hometwo'));
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
          data: date,
          axisTick: {
            show: false
          },
          legend: {
            width: "60%"
          },
          // axisLine: {
          //   lineStyle: {
          //    type:'dashed',
          //    color: 'transparent'

          //   }
          // },
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
          data: value
        }]
      };
    }
     
      option && Charttion.setOption(option);
    },
    showfei(date, value) {
    //  eventBus.$on('Name', function(val) {
      // console.log(val,'danwei');
      var chartDanweis = document.getElementById("hometreefei");
      var Chartss = echarts.init(chartDanweis);
      // if (Charts != null && Charts != "" && Charts != undefined){
      //   Charts.dispose();
      // }
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
          data:date,
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
          data:value
        }]
      };
    }
     
      option && Chartss.setOption(option);
      // }) 
     
    },
    show(date, value) {
      var chartDanwei = document.getElementById("home");
      var Charts = echarts.init(chartDanwei);
      // if (Charts != null && Charts != "" && Charts != undefined){
      //   Charts.dispose();
      // }
      Charts = echarts.init(document.getElementById('home'));
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
          // subtext: '副标题',
          // subtextStyle: {
          //   color: 'blue'
          // },
          //padding: [0, 0, 10, 20]  // 位置
          // top: 0
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
          data: date,
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
          data: value
        }]
      };
    }
     
      option && Charts.setOption(option);
    },
    wuzishow(numlist) {
      var chartDomwuzi = document.getElementById("boxtwo");
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
      option && myChartwuzi.setOption(option);
    },
    //过磅
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
                htmlStr += '<div style="font-size:14px;color:block; text-align: center;">过磅费：' + value + '元</div>';
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
    guobangshow(hash, size) {
        var bangl = document.getElementById("totall");
        var Chartl = echarts.init(bangl);
      var option;
      option = {
        tooltip: {
          trigger: 'axis',
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
                          htmlStr += '<div style="font-size:14px;color:block; text-align: center;">过磅框数：' + value + '框</div>';
                        //  htmlStr +='时间：' + xName + '<br/>';//x轴的名称
                    }
                    htmlStr +='<div>';
                    htmlStr += '</div>';
               
                     return htmlStr;
                }
          
                },
        },
        legend: {

        },
        grid: {
          left: '1.2%',
          right: '2%',
          bottom: '15%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: hash,
          splitLine: {
            show: true,
            lineStyle: {
              type:'dashed',
              color: 'transparent'
            },
            axisTick: {  //设置刻度线样式为不显示
             show: false
        },
          },
        
        },
        yAxis: {
          type: 'value',
          name:"(单位)框数",
          splitLine: {
            show: true,
            lineStyle: {
              type:'dashed'
            }
          },
        
        },
        series: [
          {
           
            type: 'line',
          
          },
          {
           
            type: 'line',
           
            data: size,
            markPoint: {
             
            },
            itemStyle: {
                        normal: {
                            color: '#fff',
                            fontSize: 14,
                            lineStyle:{
                                width:5, //折线宽度

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
      };
      option && Chartl.setOption(option);
      
    },
    toshow(hash, size) {
      this.$nextTick(()=>{
        var bang = document.getElementById("total");
        var ChartBang = echarts.init(bang);
      var option;
      option = {
        tooltip: {
          trigger: 'axis',
        formatter: function (siez, ticket, callback) {
                var htmlStr = '';
                for(var i=0;i<siez.length;i++){
                    var size = size[i];
                    var xName = siez.name;//x轴的名称
                    // var seriesNames= siez.seriesName;//图例名称
                    var value = siez.value;//y轴值
                    // var color = siez.color;//图例颜色
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
        legend: {

        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '15%',
          top: '10%',
          containLabel: true
        },
       
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: { readOnly: false },
        //     magicType: { type: ['line', 'bar'] },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: hash,
          splitLine: {
            show: true,
            lineStyle: {
              type:'dashed',
              color: 'transparent'
            },
            axisTick: {  //设置刻度线样式为不显示
             show: false
        },
          },
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          name:"(单位)kg",
          splitLine: {
            show: true,
            lineStyle: {
              type:'dashed'
            }
          },
          // axisLabel: {
          //   formatter: '{value} kg'
          // }
        },
        series: [
          {
           
            type: 'line',
            // data: [10, 11, 13, 11, 12, 12, 9],
            // markPoint: {
            //   // data: [
            //   //   { type: 'max', name: 'Max' },
            //   //   { type: 'min', name: 'Min' }
            //   // ]
            // },
            // markLine: {
            //   data: [{ type: 'average', name: 'Avg' }]
            // }
          },
          {
           
            type: 'line',
            // data: [1, 2, 2, 5, 3, 2, 0],
            data: size,
            markPoint: {
              // data: [{ name: '周最低', value: 1, xAxis: 1, yAxis: -1.5 }]
            },
            itemStyle: {
                        normal: {
                            color: '#fff',
                            fontSize: 14,
                            lineStyle:{
                                width:5, //折线宽度

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
      };
      option && ChartBang.setOption(option);
      })
    },
  },
 
};

</script>
<style lang="less" scoped>
::v-deep .el-icon-time:before{
  content: '' !important;
}
::v-deep .el-tabs__item:hover{
  color: #6971ef !important;
}
::v-deep .el-tabs__active-bar{
  background-color: #6971ef;
}
::v-deep .el-tabs__item.is-active{
  color: #6971ef !important;
}

.imgs {
  width: 20px !important;
  height: 20px !important;
  margin-top: 10px;
}

::v-deep [data-v-1c66ccf4] .el-select .el-input .el-select__caret {
  position: relative;
  top: 0px;
  left: 2px;
}
.atn{
   text-align: center;
   line-height: 40px;
   width: 150px !important;
   color: #fff;
   border-radius: 18px !important;
   background-color: #14CE66 !important;
   position: absolute;
   right: 10%;
}
::v-deep [data-v-1c66ccf4].el-date-editor .el-range-input {
  // margin-top: 3px;
  width: 44%;
}

.tab {
  width: 100%;
  height: 100%;
}

.left {
  width: 50%;
  overflow: hidden;
}

.right {
  overflow: hidden;
  width: 50%;
}

.tab-s {
  width: 100%;
  height: 100%;
}

.total {
  width: 100%;
  height: 100%;
}

.top-c {
  width: 100%;
  // height: 300px;
}

.down-c {
  display: flex;
  justify-content: space-between;
  width: 100%;
  // height: 300px;
}

.cont {
  width: 100%;
  // height: 130px;
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
  border: 1px solid #e4e4e4;
  border-radius: 4px 4px 0 0;
  position: relative;
}


.com-h {
  // height: 177px;
  border: 1px solid #e4e4e4;
  border-radius: 4px 4px 0 0;
  position: relative;
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
  // height: 373px;
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

::v-deep [data-v-1c66ccf4] .el-form-item__label {
  width: 100px !important;
}

.imgs {
  width: 20px;
  height: 20px;
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
  margin-top: 20px;
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

::v-deep [data-v-257a3854] .el-button {
  margin-left: -50px;
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
  height: 40px;;
  color: #fff;
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
  height: 40px;
}
::v-deep .el-date-editor .el-range__close-icon {
  margin-bottom: 10px;
  margin-left: 10px;
}

::v-deep .el-button {
  background-color: #0ec7b7;
  height: 40px;
  width: 80px;
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
  height: 100% ;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
}


::v-deep .el-input__inner {
  width: 235px;
}
.all {
  display: flex;
  flex-direction: column;
}

.btn {
  display: flex;
  // margin-top: -9px;
}
.header {
  width: 100%;
  height: 100%;
}
</style>