<template>
  <div class="setting">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="原密码：" prop="password">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="recheckPassword">
        <el-input v-model="form.recheckPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { changePassword } from '@/api/account.js'
  import { outLogin } from '@/api/login.js'
  import { removeToken } from '@/utils/cookie.js'
  import md5 from 'js-md5'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback()
        }
      }
      return {
        form: {},
        rules: {
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          recheckPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(valid => {
          const { password, newPassword, recheckPassword } = this.form
          const data = {
            password: md5(password),
            newPassword: md5(newPassword),
            recheckPassword: md5(recheckPassword),
            id: this.userInfo.id
          }
          changePassword(data).then(res => {
            outLogin().then(res => {
              removeToken()
              window.location.reload()
            })
          })
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.setting{
  width: 600px;
  margin: 100px auto;
}
</style>