<template>
  <div class="login">
    <div class="logo">
      <i class="iconfont icon-licaitouzi"></i>
    </div>
    <h1>家庭财务管理系统</h1>
    <div class="body">
      <el-card :body-style="{ padding: '20px' }" class="form-wrap" shadow="hover">
        <p class="title text-center primary">登录</p>
        <el-form :model="loginForm" ref="loginForm" :rules="rules" label-width="30px" size="small" hide-required-asterisk>
          <el-form-item prop="mobile">
            <span slot="label" class="iconfont icon-shouji1"></span>
            <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span slot="label" class="iconfont icon-mima"></span>
            <el-input v-model="loginForm.password" type="password" show-password placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button type="primary" @click="submit" style="width:100%;">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="icon-bottom left">
      <i class="iconfont icon-licaishouyi"></i>
    </div>
    <div class="icon-bottom right">
      <i class="iconfont icon-jijin"></i>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/login.js'
import { setToken } from '@/utils/cookie.js'
import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
      },
      tstring: '',
      rules: {
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    submit() {
      // 表单验证
      this.$refs.loginForm.validate((valid) => {
        if(valid){
          const { mobile, password } = this.loginForm
          let data = {
            mobile,
            password: md5(password)
          }
          userLogin(data).then(res => {
            // 登录成功后设置 token，失败的处理已经过封装，错误的请求会统一进行了报错处理，不在此处体现
            setToken(res.data)
            // 跳转至角色选择页面
            this.$router.push('/dashboard')
          }).catch(() => {
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login{
  padding-top: 150px;
  background-color: rgba($color: #409EFF, $alpha: 0.08);
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .logo{
    text-align: center;
    .iconfont{
      font-size: 80px;
      color: #409EFF;
      text-shadow: 2px 4px 3px rgba($color: #409EFF, $alpha: 0.3);
    }
  }
  h1{
    color: #409EFF;
    text-align: center;
    text-shadow: 2px 4px 3px rgba($color: #409EFF, $alpha: 0.3);
    letter-spacing: 0.1em;
  }
  .body{
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    .form-wrap{
      display: block;
      margin: 0 auto;
      width: 300px;
      background-color: #fff;
      .title{
        margin: 0 0 10px 0;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.1em;
      }
    }
  }
  .icon-bottom{
    .iconfont{
      font-size: 100px;
    }
    font-weight: bold;
    color: #409EFF;
    position: fixed;
    bottom: 7%;
    &.left{
      opacity: 0.5;
      transform: scale(5) rotate(45deg);
      left: 7%;
    }
    &.right{
      opacity: 0.7;
      transform: scale(4) rotate(-35deg);
      right: 15%;
      bottom: 14%;
    }
  }
}
</style>