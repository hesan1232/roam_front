<template>
  <div id="login">
    <!-- 登录模块 -->
    <div class="bg login-bg" ref="login">
      <div class="avater"><i class="el-icon-user"></i></div>
      <el-form
        :model="loginFormInfo"
        status-icon
        :rules="rules"
        ref="loginFormInfo"
        label-width="70px"
        label-position="left"
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
    <div class="bg reg-bg" ref="register">
      <el-form
        :model="registerFormInfo"
        status-icon
        :rules="rules"
        ref="registerFormInfo"
        label-width="70px"
        label-position="left"
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
      <p class="toLogin" @click="toLogin">返回登录</p>
    </div>
    <!-- 代码雨背景 -->
    <canvas id="bg"></canvas>
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
      loginFormInfo: {     },
      registerFormInfo: {},
      rules: {
        userName: { required: true, message: "请填写用户", trigger: "change" },
        password: { required: true, message: "请输入密码", trigger: "change" },
        checkPass: { validator: validatePass2, trigger: "change" },
      },
    };
  },
  mounted(){
    // this.drawBg()
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
            this.$message.success('登录成功')
            setToken(res.token)
           
            this.$store.dispatch('getUserInfo').then(()=>{
              this.$router.push({ path: "/home" })
            })
            
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
    //代码雨背景
    drawBg(){
      const cvs=document.getElementById('bg')
        const width=window.innerWidth
        const height=window.innerHeight
        
        cvs.width=width
        cvs.height=height

        const ctx=cvs.getContext('2d')

        // 列宽
        const columnWidth=20
       
        //列数
        const columnCount=Math.floor(window.innerWidth/columnWidth)
        //记录每列写到了第几个文字
        const columnNestIndexes=new Array(columnCount);
        columnNestIndexes.fill(1)

        //绘画的函数
        function draw(){
          ctx.fillStyle='rgba(240,240,240,0.1)'
          ctx.fillRect(0,0,width,height)
          const fz=20
          ctx.fillStyle=getRandomColor()
          ctx.font=`${fz}px "Roboto Mono"`
          for(let i=0;i<columnCount;i++){
           const x=i*columnWidth
           const y=fz*columnNestIndexes[i]
           ctx.fillText(getRandomChar(),x,y)
           if(y>height&&Math.random()>0.99){
            columnNestIndexes[i]=0
           }
           else{
            columnNestIndexes[i]++
           }
          }
         
        }
        //随机颜色 
        function getRandomColor(){
            const fontColors=[
                '#33B5E5',
                '#0099cc',
                '#AA6655',
                '#9933cc',
                '#99cc00',
                '#669900',
                '#ffbb33',
                '#ff8800',
                '#ff8844',
                '#cc0000',
            ]
            return  fontColors[Math.floor(Math.random()* fontColors.length)]
        }
         
        //随机文字
        function getRandomChar(){
            const str='console.log("hello word")'
            return str[Math.floor(Math.random()*str.length)]
        }
        setInterval(draw, 40);
    }
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/bg1.jpg");
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.avater{
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50px;
  margin: 0 auto;
}
.avater i{
  margin-top: 20px;
  font-size: 50px;
}
.toLogin{
  font-size: 12px;
  margin-top: 20px;
}
.bg{
  width: 500px;
  background-color: rgba(212, 228, 240, 0.4);
  border-radius: 10px;
  padding: 30px 0;
  text-align: center;
  position: absolute;
  top: 50%;
  right: 50%;
  transform:translate(50%,-50%);
  box-shadow: 0px 5px 5px 2px rgb(107, 105, 105);
  transition: opacity 0.8s linear;
}
.login-bg {
  z-index: 10;
}

.demo-loginFormInfo {
  width: 300px;
  padding-top: 20px;
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
  z-index: 1;
  opacity: 0;
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