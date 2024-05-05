<template>
    <div>
        <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right" replace  class="top ">
          <el-breadcrumb-item  v-for="item in navs" :key="item.path">{{
            item.meta.title
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
  data(){
    return{
      showNav:1
    }
  },
    computed: {
      navs() {
        console.log(this.$route.matched);
        let routes=this.$route.matched
        return routes
      },
    },
    mounted() {
      this.navs;
     
    },
    created(){
      this.getNav()
    },
    methods:{
      getNav(){
          this.showNav=this.navs[0].name
          console.log(this.showNav);
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  ::v-deep .el-card{
    border-radius: 0px;
  }
  .top{
    line-height: 40px !important;
  }
  ::v-deep .el-card__body{
    padding:0px 10px !important;
    height: 40px !important;
    line-height: 30px !important;
    border-radius: 0px !important;
    box-shadow: 2px 0px 6px #727070;
  }
  
  </style>