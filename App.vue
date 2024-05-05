<template>
  <div id="app" style="height: 100%">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tranSitionName: "slide",
    };
  },
  // watch:{
  //   $route(to,from){
  //     if(to.meta.index>from.meta.index){
  //       this.tranSitionName='slide-left'
  //     }else if(to.meta.index<from.meta.index){
  //        this.tranSitionName='slide-right'
  //     }else{
  //       this.tranSitionName=''
  //     }
  //   }
  // },
  components: {},
};
</script>

<style>
.slide-enter {
  transform: translateX(-100vw);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active {
  transform: all ease-in 1s;
}
.slide-leave {
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
}
.slide-leave-active {
  transition: all ease-in;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
#id {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
