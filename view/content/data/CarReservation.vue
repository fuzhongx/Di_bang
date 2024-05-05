<template>
  <div class="header">
    <el-tabs  v-model="activeName" class="all" >
      <el-tab-pane label="全部数据" name="first" class="first">
      <CarIndex></CarIndex>
      </el-tab-pane>
      <el-tab-pane label="待我审批" name="second">
        <ShenPizhong></ShenPizhong>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import ShenPizhong from '@/components/CarReservation/ShenPizhong.vue'
import CarIndex from '@/components/CarReservation/CarIndex.vue'
export default {
  data() {
    return {
      activeName: 'first'
    }
  } ,
  components: {
    ShenPizhong,
    CarIndex
    
  }
}
</script>
  
<style lang="less" scoped>
::v-deep .el-tabs__content{
overflow: inherit !important;
height: 90%;
}
// .first{
//   height: 720px;
// }
::v-deep .el-select .el-input .el-select__caret {
    right: 10px;
    position: absolute;
    top: -6px;
}
::v-deep .el-pagination__editor.el-input{
  width: 50px;
  height: 30px;
}
::v-deep .el-pagination .el-select .el-input .el-input__inner{
  width: 100px;
  height: 30px;
}
::v-deep .el-pagination__editor.el-input{
  width: 50px !important;
}
.block{
  position: absolute;
  right: 30px;
  bottom: 30px;
}
::v-deep .el-dialog__body {
  padding: 0px 20px;
}

::v-deep .el-tabs__item {
  color: #999999;
  font-size: 18px;
}

::v-deep .el-form-item {
  margin-bottom: 0px;
}

.btn-R {
  position: absolute;
  right: 20px;
}

.topTitle {
  display: block;
  line-height: 40px;
  height: 40px;
  background-color: rgb(245, 223, 184);
  border: 1px solid #ebae07;
  padding-left: 20px;
}

.btn-l {
  margin-right: 140px;
}

.add {
  position: absolute;
  right: 20px;
}

::v-deep .el-button {
  height: 40px;
  text-align: center;
  line-height: 0px;
  margin-left: 20px;
  border-radius: 0;
  border: 0;
  background-color: #0ec7b7;
}

::v-deep .el-input {
  width: 400px;
  height: 40px;
}

::v-deep .el-input__inner {
  height: 40px;
}

.all {
  position: relative;
  background-color: #fff;
  margin: 0 auto;
  padding: 10px 20px;
  margin: 0 auto;
}

.header {
  width: 100%;
  height: 100%;
}</style>