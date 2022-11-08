<template>
  <div id="login">
    <!-- 登录模块 -->
    <div class="bg" ref="login">
      <el-form
        :model="loginFormInfo"
        status-icon
        :rules="rules"
        ref="loginFormInfo"
        label-width="100px"
        class="demo-loginFormInfo"
      >
        <el-form-item label="用户名:" prop="userName">
          <el-input type="text" v-model="loginFormInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="loginFormInfo.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginFormInfo')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginFormInfo')">重置</el-button>
        </el-form-item>
      </el-form>
      <button class="toRegister" @click="toRegister">没有账号，点此注册</button>
    </div>
    <!-- 注册模块 -->
    <div class="reg-bg" ref="register">
      <el-form
        :model="registerFormInfo"
        status-icon
        :rules="rules"
        ref="registerFormInfo"
        label-width="100px"
        class="demo-loginFormInfo"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            type="text"
            v-model="registerFormInfo.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerFormInfo.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerFormInfo.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <button class="btn" @click="userRegister('registerFormInfo')">
        完成注册
      </button>
    </div>
  </div>
</template>

<script>
//导入user请求
import { reqUserLogin, reqUserRegister } from "@/api/user";
//导入token设置
import { setToken } from "@/api/token";
export default {
  name: "Login",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerFormInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginFormInfo: {
        userName: "",
        password: "",
      },
      registerFormInfo: {
        userName: "",
        password: "",
        checkPass: "",
      },
      rules: {
        userName: { required: true, message: "请填写用户", trigger: "change" },
        password: { required: true, message: "请输入密码", trigger: "change" },
        checkPass: { validator: validatePass2, trigger: "change" },
      },
    };
  },
  methods: {
    //登录表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.reqLogin();
        } else {
          return false;
        }
      });
    },
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //登陆隐藏，显示注册
    toRegister() {
      this.$refs.login.style.opacity = 0;
      let tamer = setTimeout(() => {
        this.$refs.login.style.display = "none";
        this.$refs.register.style.opacity = 1;
        this.$refs.register.style.display = "block";
        this.loginFormInfo = { userName: "", password: "" };
        clearTimeout(tamer);
      }, 600);
    },
    //注册隐藏，显示登录
    toLogin() {
      this.$refs.register.style.opacity = 0;
      let tamer1 = setTimeout(() => {
        this.$refs.register.style.display = "none";
        this.$refs.login.style.opacity = 1;
        this.$refs.login.style.display = "block";
        (this.registerFormInfo = { userName: "", password: "", checkPass: "" }),
          clearTimeout(tamer1);
      }, 600);
      this.$refs.register.style = "none";
    },
    userRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.reqRegister();
          this.toLogin();
        }
      });
    },
    reqLogin() {
      reqUserLogin(this.loginFormInfo).then(
        (res) => {
          if (res.status == 200) {
            this.$message({type:'success',message:'登录成功',center:true});
            setToken(res.token);
            this.$router.push({ path: "/home" });
          }
        },
        (err) => {
          this.$message.error("登录失败，请确认用户名和密码");
        }
      );
    },
    reqRegister() {
      reqUserRegister(this.registerFormInfo).then(
        (res) => {
          this.$message.success("注册成功，返回登录");
          this.loginFormInfo = this.registerFormInfo;
        },
        (err) => {
          this.$message.error(err);
        }
      );
    },
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/bg1.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}
.bg {
  width: 500px;
  height: 100%;
  background-color: rgba(212, 228, 240, 0.5);
  border-radius: 25px 0 0 25px;
  padding: 180px auto;
  text-align: center;
  position: absolute;
  z-index: 10;
  right: 0;
  box-shadow: -5px 5px 10px 0px rgb(107, 105, 105);
  transition: opacity 0.8s linear;
}
.demo-loginFormInfo {
  width: 300px;
  padding-top: 180px;
  margin-left: 70px;
}
.el-button {
  border-radius: 10px;
}
.toRegister {
  width: 150px;
  height: 30px;
  line-height: 30px;
  border: none;
  background-color: transparent;
  color: rgb(89, 99, 96);
  cursor: pointer;
}
.toRegister:hover {
  color: rgb(159, 127, 94);
}
/* register模块 */
.reg-bg {
  width: 500px;
  height: 100%;
  background-color: rgba(212, 228, 240, 0.5);
  border-radius: 25px 0 0 25px;
  padding: 180px auto;
  text-align: center;
  position: absolute;
  z-index: 1;
  right: 0;
  box-shadow: -5px 5px 10px 0px rgb(107, 105, 105);
  opacity: 0;
  transition: opacity 0.8s linear;
}
.btn {
  width: 150px;
  height: 30px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: rgb(246, 212, 175);
  border-radius: 10px;
}
</style>