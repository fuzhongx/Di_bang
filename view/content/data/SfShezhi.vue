<template>
  <div class="header">
    <!-- <el-card class="box-card all"> -->
      <div class="top_title">
          <span class="topTitle">(针对物资一级分类进行收费，需要设置按吨收费的单价，未设置的默认单价为0元。)</span>
      </div>
      <div>
        <el-form>
          <el-form-item label="关键词:" prop="age" class="guanjian">
            <el-input autocomplete="off" placeholder="请输入分类名称或编号" class="inpWidth" v-model="skyName"></el-input>
            <el-button type="primary" @click="lookSelect"> <i><img src="@/assets/s.png" alt=""
                  class="imgs"></i><span class="nav_btn">搜索</span></el-button>
          </el-form-item>
          <el-form-item> </el-form-item>
          <div style="margin-top: -10px">
            <el-table 
            @selection-change="handleSelectionChange"
            :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :header-cell-style="{
              background: '#E4E4E4',
            }" border class="table">
              <el-table-column fixed label="序号" align="center" type="index">
              </el-table-column>
              <el-table-column prop="itemName" label="一级分类" align="center">
              </el-table-column>
              <el-table-column prop="itemCode" label="分类编号" align="center">
              </el-table-column>
              <el-table-column prop="tonPrice" label="按吨收费" align="center">
                <!-- <template slot-scope="scope">
                  <span v-if="scope.row.tonPrice=0&scope.row.tonPrice==''">未设置</span>
                  <span v-else>{{ scope.row.tonPrice }}</span>
                </template> -->
              </el-table-column>
              <el-table-column prop="boxPrice" label="按框收费" align="center">
              </el-table-column>
              <el-table-column prop="lastUpdate" label="最后更新时间" align="center">
              </el-table-column>
              <el-table-column prop="configBy" label="配置人" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="txtColor" @click="peizhi(scope.row)">价格配置</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="收费配置" :visible.sync="addDialog" class="dialog">
            <el-form :model="form" :rules="rules" style="width: 100%;">
              <div style="display: flex;">
                <el-form-item label="一级分类:" :label-width="formLabelWidth" prop="name">
                  <el-input class="ipt-w " v-model="form.itemName" autocomplete="off" placeholder="请输入">
                  </el-input>
                </el-form-item>
                <el-form-item label="分类编号:" :label-width="formLabelWidth" prop="name" class="lei">
                  <el-input class="ipt-w" v-model="form.itemCode" autocomplete="off" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div style="display:flex;justify-content: space-between;">
                <el-form-item label="按顿过磅:" :label-width="formLabelWidth">
                  <el-input class="" v-model="form.tonPrice" autocomplete="off" placeholder="请输入">
                    <template slot="append">元/顿</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="按框收费:" :label-width="formLabelWidth">
                  <el-input class="" v-model="form.boxPrice" autocomplete="off" placeholder="请输入">
                    <template slot="append">元/框</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialog = false"
                style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取
                消</el-button>
              <el-button @click="UPsubmit" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
                定</el-button>
            </div>
          </el-dialog>
        </el-form>
        <div class="block">
          <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout=" prev, pager, next, jumper,total" :total=this.tableData.length>
          </el-pagination>
        </div>
      </div>
    <!-- </el-card> -->
  </div>
</template>
<script>
import {
  sfList,
  sfPeizhi
} from "@/api/login"
export default {
  // tableRowClassName({ row, rowIndex }) {
  //   if (rowIndex === 1) {
  //     return 'warning-row';
  //   } else if (rowIndex === 3) {
  //     return 'success-row';
  //   }
  //   return '';
  // }

  data() {
    return {
      pageSize:5,
      // pageSizes:[5,10,15],
      currentPage:1,
      skyName: '',
      id:{},
      form: {
        itemName: '',
        itemCode: '',
        tonPrice: '',
        boxPrice: '',
      },
      formLabelWidth: '120px',
      addDialog: false,
      rules: {
        name: [{ required: true, trigger: "blur" }],
      },
      tableData: [],
      multipleSelection:[]
    };
  },
  mounted() {
    this.lookSelect()
  },
  computed:{},
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    handleSizeChange(val) {       
      this.currentPage = 1;
      this.pageSize = val;
      this.lookSelect();
    },
    //切换当前页
    handleCurrentChange(val) {    
      this.currentPage = val;
      this.lookSelect();
    },
    UPsubmit() {
      sfPeizhi(
        {
          id:JSON.stringify(this.id),
          tonPrice: this.form.tonPrice,
          boxPrice: this.form.boxPrice
        }
      ).then((res) => {
        console.log(res);
        if(res.data.Success=='ture'){
        this.$message('添加成功');
       }else{
        this.$message(res.data.ErrMsg);
       }
        this.tableData = res.data.ResData
        this.lookSelect()
      })
      this.addDialog = false
    },
    peizhi(row) {
       this.form.itemName = row.itemName,
        this.form.itemCode = row.itemCode,
        this.form.tonPrice = row.tonPrice,
        this.form.boxPrice = row.boxPrice,
        this.addDialog = true
    },
    lookSelect() {
      sfList({
        page: "1", //分页页码，数字类型
        keyword: this.skyName
      }).then(res => {
        console.log(res);
        this.tableData = res.data.ResData.data
        this.tableData.forEach((item)=>{
          // let a=[]
          // a.push(item.id)
          // this.id=a.join()
          // console.log(this.id);
          this.id=item.id
        })
      })
    }
  },
  components: {
  
  },
};
</script>
<style lang="less" scoped>
.guanjian {
  width: 98% !important;
  margin:0px auto;
  padding-top: 20px;
}
::v-deep [data-v-31909292] .el-form-item__label {
  width: 100px !important;
}

.table {
  width: 100%;
  text-align: center;
  margin-top: 10px
}
.nav_btn{
  margin-left: 5px;
}
.imgs {
  width: 15px;
  height: 10px;
}

::v-deep .el-select>.el-input {
  height: 30px !important;
}

::v-deep .el-select {
  height: 30px !important;
}

.block {
  position: absolute;
  right: 10px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.btn-R {
  position: absolute !important;
  right: 30px !important;
  background-color: #6971EF !important;
  border-radius: 18px !important;
  color: #fff !important;
}

::v-deep .el-dialog__body {
  padding: 0px 20px;
}

::v-deep [data-v-31909292] .el-form-item {
  width: 50%;

}
.top_title{
  border-bottom: 1px solid #ededed;
  box-shadow: #666666;
}


.title {
  color: #373737;
  font-size: 18px;
  font-weight: bold;
}

::v-deep .el-dialog {
  // width: 32% !important;
  border-radius: 16px;
  overflow: hidden;
}
.table{
  width: 98%;
  text-align: center;
  margin:10px auto;
}
.el-dialog__wrapper {
  top: 200px;
}

.txtColor {
  color: #6971ef;
  cursor: pointer;
}

::v-deep .el-form-item__label {
  color: #666666;
  font-size: 16px;
}

.inpWidth {
  width: 254px;
  // width: 100%;
}

.title-h {
  font-size: 18px;
  line-height: 60px;
  padding-left: 0px;
  font-weight: bold;
  color: #373737;
  width: 100%;
  height: 60px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e6e6e6;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}

.topTitle {
  font-size: 14px;
  color: #FF7C24;
  letter-spacing: 11px;
  padding: 5px 10px;
}

.btn-l {
  margin-right: 140px;
}

.add {
  position: absolute;
  right: 20px;
}

::v-deep .el-button {
  width: 80px;
  height: 30px;
  padding: 0px;
  margin-left: 20px;
}

::v-deep .el-input__inner {
  height: 30px;
}
.header {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>