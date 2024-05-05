<template>
  <div class="layout">
    <el-container class="con_box">
      <el-header>
        <div class="logo_top">
          <div>
            <i class="logo_title"><img src="@/assets/zhuye.png" alt="" /></i>
          </div>
          <div><span class="title">智慧地磅云平台</span></div>
        </div>
       <div class="zhankai el-icon-s-fold" @click="hides" v-if="this.isCollapse"></div>
       <div class="zhankai el-icon-s-unfold"  @click="shows" v-else></div>
      </el-header>
      <el-container>
        <el-aside 
        :class="{ asides: isCollapse }"
          ><el-menu
          
            collapse-transition="true"
            default-active="router"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
          <el-menu-item index="/LoginLogin">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
            <el-submenu
             hide-timeout="0"
              :index="item.id+''"
              v-for="item in navList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <el-menu-item-group
                v-for="Group in item.chlidren"
                :key="Group.id"
              >
                <el-menu-item :index="Group.router">{{ Group.title }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <NavList></NavList>
          <HomeHome></HomeHome>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavList from '@/components/NavList.vue';
import HomeHome from './content/HomeHome.vue';
export default {
  data() {
    return {
      LoginList: [],
      isCollapse: false,
      navList: [
        // {title:'首页',icon:'s-home',router:'/',url:''},
        {
          title: "称重管理",
          icon: "chat-line-square",
          router: "/WeightScalage",
          url: "",
          chlidren: [
            { title: "称重数据",router:'/WeightScalage/WeightData'},
            { title: "过磅统计", router: "/WeightScalage/WeightTotal" },
          ],
        },
        {
          title: "数据配置",
          icon: "chat-line-square",
          router: "",
          id: 1,
          url: "",
          chlidren: [
            { title: "收货单位", router: "/data/ShouHuo" },
            //  {title:'供应商',router:'/Supplier'},
            { title: "车辆预约", router: "/data/CarReservation" },
            { title: "车辆管理", router: "/data/CarCommon" },
            { title: "物资分类", router: "/data/WzFenlei" },
            { title: "地磅设备", router: "/data/DbShebei" },
            { title: "收费设置", router: "/data/SfShezhi" },
          ],
        },
        {
          title: "账户配置",
          icon: "platform-eleme",
          router: "",
          id: 2,
          url: "",
          chlidren: [
            { title: "企业信息", router: "/account/QyXinxi" },
            { title: "管理账户", router: "/account/GlZhanghu" },
          ],
        },
      ],
    };
  },
  mounted() {},
  components:{
    HomeHome,
    NavList
  },
  methods: {
    shows(){
      this.isCollapse=true
      console.log(this.isCollapse,1);
    },
    hides(){
      this.isCollapse=false
      console.log(this.isCollapse,0);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}
.zhankai{
  width: 40px;
  height: 60px;
}
::v-deep .el-icon-s-fold{
  display: block;
  line-height: 60px;
  font-size: 26px;  
  color: #fff;
  padding-top:1.5px;
  padding-left: 5px;
}
::v-deep .el-icon-s-unfold{
  display: block;
  line-height: 60px;
  font-size: 26px;  
  color: #fff;
  padding-top:1.5px;
  padding-left: 5px;
}
.layout {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  overflow: hidden;
}
.el-container{
  height: 100%;
  
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  overflow: hidden;
  height: 100% !important;
}.el-menu{
  height: 100% !important;
}
.el-header {
  display: flex;
  background-color: #a7e7ed;
  height: 60px !important;
}
.logo_top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 60px;
}
.title {
  color: #fff;
  font-weight: 400px;
  font-size: 20px;
  line-height: 60px;
}

.logo_title img {
  width: 25px;
  height: 25px;
  padding: 1px 5px;
  padding-top: 8px;
}
.el-aside{
width: 200px !important;
height: 100%;
}
.asides {
  width: 50px !important;
  border-right: solid 1px #e6e6e6;
}
.el-main {
  height:100%;
}
</style>

