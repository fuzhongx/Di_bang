<template>
  <div class="header">
      <div>
        <el-form>
          <el-form-item label="关键词:" prop="age" class="guanjian">
            <el-input autocomplete="off" placeholder="流水线/车牌号/地磅设备" class="input" v-model="keyName"></el-input>
            <el-button type="" class="btn" @click="lookSelect"> <i><img src="@/assets/s.png" alt=""
                  class="imgs-l"></i> <span class="nav_btn">搜索</span></el-button>
            <el-button type="" class="add" @click="addCar"><i><img src="@/assets/19.png" alt=""
                  class="imgs-l"></i><span class="nav_btn">添加</span></el-button>
          </el-form-item>
          <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :header-cell-style="{ background: '#e9e8e8c0', border: '1px solid #e9e9ee' }" border
            class="table" text-align="center">
            <!-- prop="driveLicenseFront" -->
            <el-table-column  prop="driveLicenseFront" label="行驶证(正)" align="center">
            
              <el-image style="width: 60px; height: 40px" :src="this.imageUrl" 
              ></el-image>
            </el-table-column>  
            <!-- prop="driveLicenseBack"  -->
            <el-table-column label="行驶证(反)" align="center">
              <el-image style="width: 60px; height: 40px" :src='this.imageUrl ' ref="img1">
              </el-image>
            </el-table-column>
            <el-table-column prop="carNumber" label="车牌" align="center">
            </el-table-column>
            <el-table-column prop="carType" label="车辆类型" align="center">
            </el-table-column>
            <el-table-column prop="driver" label="司机" align="center">
            </el-table-column>
            <el-table-column prop="driverTel" label="联系电话" align="center">
            </el-table-column>
            <el-table-column prop="buckleWeight" label="皮重(kg)" align="center">
            </el-table-column>
            <el-table-column prop="consignees" label="关联收货单位" align="center">
            </el-table-column>
            <el-table-column prop="goodsOrigin" label="货源产地" align="center">
            </el-table-column>
            <el-table-column prop="remark" label="备注说明" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="creater" label="创建人" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <span @click="handleClick(scope.row)" style="color: rgb(78, 158, 233);">编辑</span>
                <span @click="handleDelete(scope.$index)" class="del" >删除</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!-- 页数 -->
        <div class="block">
          <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout=" prev, pager, next, jumper,sizes,total" :total=this.tableData.length>
          </el-pagination>
        </div>
        <!-- :file-list=“fileList” -->
        <el-dialog title="编辑车辆
    " :visible.sync="selectDialog" class="dialog">
          <el-form :model="form" :rules="rules" style="width: 100%;">
            <el-form-item label="上传行驶证：" :label-width="formLabelWidth" prop="name">
              <el-upload 
              action="https://jsonplaceholder.typicode.com/posts/" 
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :http-request="uploadFile"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <span class="txt-P">提示：行驶证照片需要清晰无反光，照片大小不超过2M</span>
            </el-form-item>
            <div style="display:flex;">
              <el-form-item label="车牌号：" :label-width="formLabelWidth" prop="name">
                <el-input class="ipt-w" v-model="form.carid" autocomplete="off" placeholder="请输入">
                </el-input>

              </el-form-item>
            </div>
            <div style="display:flex;justify-content: space-between;">
              <el-form-item label="车辆类型：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="form.cartype" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
              <el-form-item label="车辆皮重：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="form.pizhong" autocomplete="off" placeholder="请输入">
                  <template slot="append">kg</template>
                </el-input>
              </el-form-item>
            </div>
            <div style="display:flex;justify-content: space-between;">
              <el-form-item label="司机姓名：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="form.name" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
              <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="form.phone" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
            </div>
            <div style="display:flex; justify-content: space-between;">
              <el-form-item label="关联收货单位：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="货源单位：" :label-width="formLabelWidth" class="itemWidth">
                <el-input class="ipt-w" v-model="form.huoyuan" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
            </div>
            <el-form-item label="备注说明：" :label-width="formLabelWidth">
              <el-input class="area" v-model="form.marck" autocomplete="off" placeholder="请输入" type="textarea">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="selectDialog = false"
              style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取 消</el-button>
            <el-button @click="selectlog" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
              定</el-button>
          </div>
        </el-dialog>
        
        <el-dialog title="添加车辆
    " :visible.sync="addDialog" class="dialog">
          <el-form :model="forms" :rules="rules" style="width: 100%;">
            <el-form-item label="上传行驶证：" :label-width="formLabelWidth" prop="name">
              <el-upload 
              action="https://jsonplaceholder.typicode.com/posts/" 
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <span class="txt-P">提示：行驶证照片需要清晰无反光，照片大小不超过2M</span>
            </el-form-item>
            <div style="display:flex;">
              <el-form-item label="车牌号：" :label-width="formLabelWidth" prop="name">
                <el-input class="ipt-w" v-model="forms.carid" autocomplete="off" placeholder="请输入">
                </el-input>

              </el-form-item>
            </div>
            <div style="display:flex;justify-content: space-between;">
              <el-form-item label="车辆类型：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="forms.cartype" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
              <el-form-item label="车辆皮重：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="forms.pizhong" autocomplete="off" placeholder="请输入">
                  <template slot="append">kg</template>
                </el-input>
              </el-form-item>
            </div>
            <div style="display:flex;justify-content: space-between;">
              <el-form-item label="司机姓名：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="forms.name" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
              <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-input class="ipt-w" v-model="forms.phone" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
            </div>
            <div style="display:flex; justify-content: space-between;">
              <el-form-item label="关联收货单位：" :label-width="formLabelWidth" prop="name" class="itemWidth">
                <el-select v-model="forms.region" placeholder="请选择活动区域">
                  <el-option :label="item.unitName" :value="item.unitName" v-for="item in danweiList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="货源单位：" :label-width="formLabelWidth" class="itemWidth">
                <el-input class="ipt-w" v-model="forms.huoyuan" autocomplete="off" placeholder="请输入">
                </el-input>
              </el-form-item>
            </div>
            <el-form-item label="备注说明：" :label-width="formLabelWidth">
              <el-input class="area" v-model="forms.marck" autocomplete="off" placeholder="请输入" type="textarea">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false"
              style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取 消</el-button>
            <el-button @click="addCommens" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
              定</el-button>
          </div>
        </el-dialog>
      </div>
  </div>
</template>
<script>
import { CarComList, CarallList, addCarList } from '@/api/login'
export default {
  data() {
    return {
      pageSize:5,
      pageSizes:[5,10,15],
      currentPage:1,
      iconFace:{
        face:'',
        back:''
      },
      iconBack:[],
      urlIcon:'',
      keyName: '',
      srcList: {
        url: '',
        nurl: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      selectDialog: false,
      form: {
        name: '',
        phone: '',
        huoyuan: '',
        pizhong: '',
        cartype: '',
        carid: '',
        region: ''
      },
      forms: {
        name: '',
        phone: '',
        huoyuan: '',
        pizhong: '',
        cartype: '',
        carid: '',
        region: ''
      },
      formLabelWidth: '120px',
      addDialog: false,
      rules: {
        name: [{ required: true, trigger: "blur" }],
      },
      tableData: [],
      danweiList:[],
      fileList:[],
      imageUrl:'',
      Listfiles: [],
      fileData:'',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    };
  },

  mounted() {
    this.getList()
    CarallList(
    ).then(res => {
      console.log(res, '列表');
      this.danweiList=res.data.ResData
    })
  },
  methods: {
    uploadFile(raw){
      this.Listfiles.push(raw.file)
      let fd = new FormData()
      this.Listfiles.forEach(function (file) {
        fd.append("file", JSON.stringify(file), file.name)
      })
      // IconBack({
      //     file:fd,
      //     side:'back'
      //   }).then(res=>{
      //     console.log('上传成功',res);
      //   }).catch(error=>{
      //     console.log('长传失败',error);
      //   })
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    handleSizeChange(val) {       
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    //切换当前页
    handleCurrentChange(val) {    
      this.currentPage = val;
      this.getList();
    },
    getList(){
      CarComList({
        page: "1",
        keyword: this.keyName
      }).then(res => {
        this.tableData = res.data.ResData.data
      })
    },
        handleDelete(index) {
        this.tableData.splice(index, 1);
      },
    selectlog(){
      addCarList(
        {
          carNumber: this.form.carid,
          carType: this.form.cartype,
          driver: this.form.name,
          driverTel: this.form.phone,
          buckleWeight: this.form.pizhong,
          goodsOrigin: this.form.huoyuan,
          driveLicenseFront:this.iconFace.face,
          driveLicenseBack:this.iconFace.back,
          consigneeIds: this.form.region,
          remark: this.form.marck
        }
      ).then(res => {
        this.tableData = res.data.ResData
        console.log(res, 'guanli');
        this.getList()
        
      })
      this.selectDialog=false
    },
    handleClick(row) {
        this.form.carid=row.carNumber,
        this.form.cartype=row.carType,
        this.form.name=row.driver,
        this.form.phone=row.driverTel,  
        this.form.pizhong=row.buckleWeight,
        this.form.huoyuan=row.goodsOrigin,
        // this.form.carid=row.driveLicenseFront,
        // this.form.carid=row.driveLicenseBack,
        this.form.region=row.consigneeIds,
        this.form.marck=row.remark
        this.selectDialog=true
        console.log(row,'row');
    },
    addCommens() {
      addCarList(
        {
          carNumber: this.forms.carid,
          carType: this.forms.cartype,
          driver: this.forms.name,
          driverTel: this.forms.phone,
          buckleWeight: this.forms.pizhong, 
          goodsOrigin: this.forms.huoyuan,
          driveLicenseFront: this.iconFace.face,
          driveLicenseBack: this.iconFace.back,
          consigneeIds: this.forms.region,
          remark: this.forms.marck
        }
      ).then(res => {
        this.tableData = res.data.ResData
       if(res.data.Success=='ture'){
        this.$message('添加成功');
       }else{
        this.$message(res.data.ErrMsg);
       }
        console.log(res, 'guanli');
        this.getList()
      })
      this.addDialog=false
    },
    lookSelect() {
      CarComList({
        page: "1",
        keyword: this.keyName
      }).then(res => {
        this.tableData = res.data.ResData.data
        console.log(res);
      })
      console.log('1111111');
    },

    addCar() {
      this.addDialog = true
    }
  },

  components: {
    
  },
};
</script>
  
  
<style lang="less" scoped>
.del{
  margin-left: 20px;color: rgb(78, 158, 233); cursor: pointer;
}
::v-deep [data-v-c5bfdf12] [data-v-c5bfdf12] .el-dialog {
  width: 50% !important;
}

::v-deep [data-v-454bdefb] .el-select .el-input .el-select__caret {
  right: 0px !important;
  top: 0px !important;

}
.table {
  width: 98%;
  text-align: center;
  margin:10px auto;
}
.guanjian {
  width: 98% !important;
  margin:0px auto;
  padding-top: 20px;
}
.imgs-l {
  width: 15px;
  height: 10px;

}
::v-deep .el-button {
  width: 80px;
  height: 30px;
  padding: 0px;
  margin-left: 20px;
}
.nav_btn{
  margin-left: 5px;
}
.btn {
  background-color: #6971EF !important;
  color: #fff !important;
}
.add {
  position: absolute;
  right: 0px;
  background-color: #6971EF !important;
  color: #fff;
}

::v-deep .el-select .el-input .el-select__caret {
  right: 20px;
  position: absolute;
  top: -6px;
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
  // bottom: 20px;
}

::v-deep .el-dialog__body {
  padding: 0px 20px;
}

::v-deep .el-select>.el-input {
  width: 100% !important;
}

::v-deep .el-select {
  width: 100% !important;
}

.input {
  width: 254px !important;
}

::v-deep .el-select .el-input__inner {
  width: 100%;
}

.itemWidth {
  width: 50% !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.title {
  color: #373737;
  font-size: 18px;
  font-weight: bold;
}

::v-deep .el-dialog {
  border-radius: 18px;
}

.ipt-w {
  width: 100% !important;
}

// .area{
//   width: 82% !important;
// }
::v-deep input[type=file] {
  display: none;
}

.txt-P {
  font-size: 12px;
  color: #D1D1D1;
}
::v-deep .el-form-item {
  width: 100%;
}




::v-deep .el-input {
  width: 400px;
  height: 40px;
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
