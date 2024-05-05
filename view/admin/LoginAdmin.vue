<template>
  <div class="login">
    <div class="box">
      <el-form
        :model="Form"
        ref="Form"
        label-width="100px"
        class="demo-dynamic biao"
        :rules="rules"
      >
        <el-form-item prop="email" class="top">
          <i class="iocn-logo"
            ><img src="@/assets/444.png" alt="" class="logo"
          /></i>
          <i class="imng-l">
            <img src="@/assets/lo.png" alt="" class="img-r"
          /></i>
        </el-form-item>
        <el-form-item prop="name" class="pho">
          <el-input v-model="Form.name" placeholder="用户名/手机号" class="text_inp"></el-input>
          <i class="phone-l"
            ><img src="@/assets/k.png" alt="" class="imgs"
          /></i>
        </el-form-item>
        <el-form-item prop="password" class="paw">
          <el-input
            v-model="Form.password"
            placeholder="请输入密码"
            :type="type"
            class="text_inp"
            ></el-input>
          <i class="phone-l"
            ><img src="@/assets/333.png" alt="" class="imgs"
          /></i>

          <i class="icons" v-if="floag == 1"
            ><img
              src="@/assets/biyan.png"
              alt=""
              class="biyan"
              @click="showPsd"
          /></i>
          <i class="icons" v-if="floag == 2"
            ><img src="@/assets/kai.png" alt="" class="biyan" @click="showPsd"
          /></i>
        </el-form-item>
      <div class="mima">
        <span class="unpw" @click="ForgotPsd" >忘记密码</span>
        <span class="jihuo" @click="activation">账号激活</span>
      </div>
          <el-button @click="submitForm('Form')" class="denglu">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { logint, userLise } from "@/api/login";
export default {
  data() {
    return {
      type: "password",
      floag: 1,
      Form: {
        name: "",
        password: "",
      },
      token: "",
      loginForm: [],
      rules: {
        name: [
          { required: true, message: "*请输入正确的账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "*请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6到 18个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // this.fun()
    userLise().then((res) => {
      console.log(res, "133323");
    });
  },
  methods: {
    shoe(){
      console.log('790-');
    },
    submitForm(Form) {
      let dta = {
        username: this.Form.name,
        password: this.Form.password,
      };
      this.$refs[Form].validate((valid) => {
        if (valid) {
          logint(dta).then((res) => {
            console.log(res.data);
            this.loginForm = res.data;
            if (res.data.ErrCode == 0) {
              sessionStorage.setItem("token", res.data.ResData.token);
              localStorage.setItem("token", res.data.ResData.token);
              sessionStorage.setItem("act", res.data.ResData.userName);
              sessionStorage.setItem("id", res.data.ResData.corpId);
              this.$router.push("/LoginLogin");
            } else {
              alert(res.data.ErrMsg);
              console.log(res.data.ErrMsg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ForgotPsd() {
      this.$router.push("/ForgotPsd");
    },
    activation() {
      this.$router.push("/JihuoLogin");
    },
    showPsd() {
      this.type = "text";
      this.floag += 1;
      if (this.floag > 2) {
        this.floag = 1;
        this.type = "password";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.text_inp{
  width: 100% !important;
  
}

.denglu {
  width: 80%;
  height: 40px;
  position: absolute;
  top: 65%;
  background-color: #6971ef;
  color: #fff;
  font-size: 16px;
}
.logo {
  width: 10%;
  height: 12%;
  margin-left: 15px;
}
.btn-p {
 width: 100%;
  margin-bottom: 0px !important;
}

.jihuo {
  cursor: pointer;
  color: #666666;
  font-size: 12px;
}

.unpw {
  cursor: pointer;
  color: #666666;
  font-size: 12px;
}

.biyan {
  width: 20px;
  height: 25px;
  position: absolute;
  top: 5px;
  right: 5px;
}
.top{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 95%;
    margin: 40px auto;
}
.img-r {
  width: 80%;
}

.img-l {
  margin-left: 20px;
}

.biao {
  width: 92%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.iocn-logo {
  margin-right: 10px;
}

.imgs {
  width: 20px;
  height: 20px;
}

.phone-l {
  position: absolute;
  left: 20px;
  top: 14px;
 
  // color: #0e81a5;
}
.pho{
  position: absolute;
  top: 30%;
  height: 30px !important;
  width: 80%;
}
.paw{
  position: absolute;
  top: 40%;
  width: 80%;
}

.mima {
  position: absolute;
  top:60%;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.icons {
  position: absolute;
  right: 10px;
  top: 14px;
  cursor: pointer;
}

::v-deep .el-input__inner {
  padding-left: 50px !important;
  height: 40px;
  border-radius: 8px;
  width: 100%;
  margin: 0px auto;
  margin-top: 10px;
}

::v-deep .el-form-item__content {
margin-left: 0px !important;
}

.login-title {
  margin: 0px 30px;
  font-size: 40px;
  font-weight: bold;
}

::v-deep .el-form-item{
    margin-bottom: 0px;
}
.login-btn {
  width: 380px !important;
  background-color: #553ddb;
}

.el-icon-s-custom {
  position: absolute;
  left: 10px;
  top: 36%;
  color: #0e81a5;
}

.el-icon-lock {
  position: absolute;
  left: 10px;
  top: 36%;
  color: #0e81a5;
}
.box {
  width: 30%;
  height: 100%;
  background: #ffffff;
  position: absolute;
  top: 0px;
  right: 0px;
  min-width:300px;
}
::v-deep .el-input {
  position: relative;
}
.login {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/11.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-width:1200px;
  margin: 0 auto;
}
</style>