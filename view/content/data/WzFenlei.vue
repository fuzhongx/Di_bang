<template>
  <div class="header">
      <div>
        <el-form>
          <el-form-item label="关键词:" prop="age" class="guanjian">
            <el-input autocomplete="off" placeholder="分类名称/编码" v-model="importName" class="inpws"></el-input>
            <el-button type="primary" @click="look" class="btn_sou"> <i><img src="@/assets/s.png" alt="" class="img-add"> </i>搜索</el-button>
            <el-button type="success" class="add" @click="addOrder"><i><img src="@/assets/19.png" alt=""
                  class="img-add"></i>添加</el-button>
          </el-form-item>
          <el-table
           :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" class="table" row-key="id" max-height="400"
            :header-cell-style="{ background: '#e9e8e8c0', border: '1px solid #e9e9ee' }" border default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column label="序号" align="center" type="index">
            </el-table-column>
            <el-table-column prop="itemName" label="物质分类" align="center" sortable>
            </el-table-column>
            <el-table-column prop="itemCode" label="编号" align="center" sortable>
            </el-table-column>
            <el-table-column prop="useState" align="center" label="启用状态">
              <template slot-scope="scope">
              <span :class="{ 'staColor': scope.row.useState == 1 }" v-if="scope.row.useState == 1">启用</span>
              <span :class="{ 'stoColor': scope.row.useState ==0  }" v-else>停用</span>
              </template>
             
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span @click="handleClick(scope.row)" class="btnColor">编辑</span>
                <span class="bor"></span>
                <span class="btnColor" @click="undenglu(scope.row)" v-show="scope.row.useState==0">启用</span>
                <span class="btnColor" @click="odenglu(scope.row)"  v-show="scope.row.useState==1">禁用</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <el-dialog title="添加物资分类" :visible.sync="addDialog" class="dialog">
        <el-form :model="form" :rules="rules" style="width: 100%; ">

          <el-form-item label="所属上级:" :label-width="formLabelWidth" prop="name" class="lei">
            <el-input class="ipt-w " v-model="froms.shangji" autocomplete="off" placeholder="请输入">
            </el-input>
          </el-form-item>

          <el-form-item label="分类编号:" :label-width="formLabelWidth" class="lei">
            <el-input v-model="froms.bianhao" autocomplete="off" placeholder="请输入" class="ipt-w">
              <template slot="prepend">00A</template>
            </el-input>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="name" class="lei">
            <el-input class="ipt-w" v-model="froms.mingcheng" autocomplete="off" placeholder="请输入"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false"
            style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取
            消</el-button>
          <el-button @click="addSubmit" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
            定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑物资分类" :visible.sync="selectDialog" class="dialog">
        <el-form :model="form" :rules="rules" style="width: 100%; ">

          <el-form-item label="所属上级:" :label-width="formLabelWidth" prop="name" class="lei">
            <el-input class="ipt-w " v-model="form.pid" autocomplete="off" placeholder="请输入">
            </el-input>
          </el-form-item>

          <el-form-item label="分类编号:" :label-width="formLabelWidth" class="lei">
            <el-input v-model="form.id" autocomplete="off" placeholder="请输入" class="ipt-w">
              <template slot="prepend">00A</template>
            </el-input>
          </el-form-item>
          <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="name" class="lei">
            <el-input class="ipt-w" v-model="form.name"  placeholder="请输入"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectDialog = false"
            style="background-color: #fff;color: #666666;border-radius: 18px;border: 1px solid #d1d1d1;">取
            消</el-button>
          <el-button @click="selectSubmit" style="background-color: #6971ef;color: #fff;border-radius: 18px;">确
            定</el-button>
        </div>
      </el-dialog>
      <!-- 页数 -->
      <div class="block">
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout=" prev, pager, next, jumper,sizes,total" :total=this.tableData.length>
          </el-pagination>
      </div>
  </div>
</template>
<script>
import { arrayToTree2 } from '@/until/tree';
import { WzList, WzAdd, denglu,OneList } from "@/api/login"
export default {
  data() {
    return {
      pageSize:5,
      pageSizes:[5,10,15],
      currentPage:1,
      importName: '',
      ids:'',
      froms:{
        shangji:'',
        mingcheng:'',
        bianhao:''
      },
      form: {
        pid: '',
        id: '',
        itemName: ''
      },
      formLabelWidth: '120px',
      addDialog: false,
      selectDialog: false,
      start: 1,
      rules:{},
      tableData: [],
      ontData:[]
    };
  },
  mounted() {
    this.getList()  
  },
  methods: {
    List(){
      OneList().then((res)=>{
      this.tableData=arrayToTree2(res.data.ResData)
      console.log(res);
    })
    },
    getList(){
      WzList({
      keyword: this.importName
    }).then((res) => {
      console.log(res, 'lieniao');
      this.tableData = res.data.ResData
    })
    },
    handleSizeChange(val) {       
      this.currentPage = 1;
      this.pageSize = val;
      this.List();
    },
    //切换当前页
    handleCurrentChange(val) {    
      this.currentPage = val;
      this.List();
    },
    undenglu(row) {
      denglu(
        {
          id:row.id,
          status: "1"
        }
      ).then(res => {
        console.log(res,'禁止成功');
        // this.List()
        this.getList()
      })
    },
    odenglu(row) {
      denglu(
        {
          id:row.id,
          status: "0"
        }
      ).then(res => {
        console.log(res,'启用成功');
        // this.List()
        this.getList()
      })
    },
    addSubmit() {
      WzAdd({
        pid:this.froms.shangji, //父节点id
        itemName: this.froms.mingcheng, //分类名称
        itemCode: this.froms.bianhao//分类编码  
      }).then((res) => {
        console.log(res);
        if(res.data.Success=='ture'){
        this.$message('添加成功');
       }else{
        this.$message(res.data.ErrMsg);
       }
          // this.tableData.children = res.data.ResData
          this.tableData = res.data.ResData
          this.getList()
      })
      this.addDialog = false
    },
    selectSubmit() {
      WzAdd({
        pid: this.form.pid, //父节点id
        itemName: this.form.name, //分类名称
        itemCode: this.form.id,//分类编码
        id:this.ids
      }).then((res) => { 
        if(res.data.Success=='ture'){
        this.$message('修改成功');  
       }else{
        this.$message(res.data.ErrMsg);
       }
          this.tableData.children = res.data.ResData
          this.getList()
      })
      this.selectDialog = false
    },
    look() {
      WzList({
        keyword: this.importName
      }).then((res) => {
        console.log(res, 'lieniao');
        this.tableData = arrayToTree2(res.data.ResData)
      })
    },
    addOrder() {
      this.addDialog = true
    },
    handleClick(row) {
      console.log(row,'13123');
      this.form.id = row.itemCode
      this.form.name = row.itemName
      this.form.pid = row.pid
      this.ids=row.id
      this.selectDialog = true
      console.log(this.ids);
    },
    header({  rowIndex }) {
      if (rowIndex == 0) {
        return "headerClass";
      }
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
  },
  components: { },
};
</script>


<style lang="less" scoped>
::v-deep .el-dialog__title {
  color: #373737 !important;
  font-size: 18px !important;
}

::v-deep .el-dialog {
  width: 23% !important;
  border-radius: 16px;
  overflow: hidden;
}

.ipt-w {
  width: 100% !important;

}
.guanjian{
  margin: 10px 12px;
}
.lei {
  width: 100% !important;
  margin-top: 20px;

}

.inpws {
  width: 254px !important;
}

.table {
  width: 98%;
  margin-bottom: 20px;
  text-align: center;
  margin: 10px auto;
}

::v-deep .el-pagination__editor.el-input {
  height: 30px !important;
}

::v-deep .el-select {
  height: 30px !important;
}

::v-deep .el-pagination .el-select .el-input .el-input__inner {
  height: 30px;
}

.block {
  position: absolute;
  right: 10px;
  bottom: 20px;
}

::v-deep .el-dialog__body {
  padding: 0px 20px;
}

.img-add {
  width: 10px;
  height: 10px;
  margin-right: 10px;
}

.staColor {
  color: #67C23A;
}

.stoColor {
  color: #666666;
}

::v-deep .el-table .caret-wrapper {
  display: none;
}

.title {
  color: #373737;
  font-size: 18px;
  font-weight: bold;
}

.btnColor {
  color: #6971ef;
  // background-color: #fff !important;
  border: 0px !important;
  outline: 0;
  cursor: pointer;
}

.bor {
  border: 0;
  display: inline-block;
  background-color: #6971ef;
  width: 2px;
  height: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

::v-deep .el-form-item {
  margin-bottom: 0px;
}


.btn_sou{
  position: absolute;
  top: 13%;
  left: 28%;
}
.add {
  position: absolute;
  top: 13%;
  left: 40%;
}

  ::v-deep .el-button {
  width: 80px;
  height: 30px;
  padding: 0px;
  background-color: #6971ef;
}

 

::v-deep .el-input {
  // width: 400px;
  height: 40px;
}

::v-deep .el-input__inner {
  height: 30px;
}
.header {
  width: 100%;
  height: 100%;
}
</style>