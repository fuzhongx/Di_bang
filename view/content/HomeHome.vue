<template>
  <div>
    <transition enter-active-class="animate__animated animate__bounceInLeft" ><router-view></router-view></transition>
  </div>
</template>
<script>
export default {
data(){
  return{
    
  }
}

}
</script>

<style lang="less" scoped>
&.c-enter{
  opacity: 1;
  transform: translateX(40%);
}
&.c-enter-active{
  transition: all 2s;
}
&.c-leave-active{
transition: all 2s;
}
&.c-leave-to{
  opacity: 0;
  transform: translateX(-40%);
}
</style>