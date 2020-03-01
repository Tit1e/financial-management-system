<template>
  <el-container class="right-content">
    <el-main>
      <div class="top-header">
        <div class="pull-left menu-wrap">
          <router-link class="menu" :class="$route.name === item.route ? 'active' : ''" tag="div" :to="'/' + item.route" :title="item.title" v-for="item in menus" :key="item.route">
            <img :src="item.icon"></span>
          </router-link>
        </div>
        <router-link class="title" tag="span" to="/dashboard"><span class="iconfont icon-licai"></span> 家庭财务管理系统</router-link>
        <div class="pull-right">
          <span style="margin-right: 10px;">
            <!-- <el-avatar size="small" src="//publichz.oss-cn-hangzhou.aliyuncs.com/%E9%BB%98%E8%AE%A4%E8%B5%84%E6%BA%90/avatar.png" style="vertical-align: middle;"></el-avatar> {{roleInfo.role_name}} -->
          </span>
          <el-button type="text" size="large" @click="outLogin">退出登录</el-button>
        </div>
      </div>
      <div class="bottom-body">
        <!-- <div class="menu">
          <menu-bar/>
        </div> -->
        <div class="body">
          <el-card :body-style="{ 'padding': '10px', 'height': '100%', 'box-sizing': 'border-box', 'overflow-y': 'auto', 'overflow-x': 'hidden' }" shadow="never" v-autoheight>
            <transition name="fade-transform" mode="out-in">
              <keep-alive exclude="publicDetail">
                <router-view ref="currentPage"/>
              </keep-alive>
            </transition>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import menuBar from './components/menuBar'
import { mapGetters } from 'vuex'
import { outLogin } from '@/api/login.js'
import { removeToken } from '@/utils/cookie.js'
import dashboard from '@/assets/svg/dashboard.svg'
import detail from '@/assets/svg/detail.svg'
import setting from '@/assets/svg/setting.svg'
export default {
  components: { menuBar },
  computed: {
    ...mapGetters(['userInfo', 'roleInfo'])
  },
  data() {
    return {
      visible: false,
      menus: [
        {
          title: '首 页',
          route: 'dashboard',
          icon: dashboard
        },
        {
          title: '收支明细',
          route: 'detail',
          icon: detail
        },
        {
          title: '系统设置',
          route: 'setting',
          icon: setting
        },
      ]
    }
  },
  created(){
    console.log(dashboard)
  },
  methods: {
    outLogin(){
      outLogin().then(() => {
        removeToken()
        window.location.reload()
      })
    },
  }
}
</script>

<style scoped lang="scss">
.right-content{
  height: 100vh;
  .el-main{
    background-color: rgba(0,0,0,.03);
    padding: 0;
    .top-header{
      padding: 0 20px 0 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba($color: #3E80CC, $alpha: 0.1);
      box-shadow: 0 0 10px rgba(0,0,0,.2);
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #666;
      z-index: 9;
      .title{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: bold;
        padding-left: 10px;
        font-weight: 900;
        font-size: 20px;
        color: #3E80CC;
        letter-spacing: 0.1em;
        line-height: 60px;
        vertical-align: middle;
        cursor: pointer;
        .icon-licai{
          font-size: 40px;
          vertical-align: middle;
        }
      }
      .menu-wrap{
        display: flex;
        .menu{
          width: 48px;
          height: 48px;
          line-height: 48px;
          flex-grow: 1;
          flex-shrink: 0;
          margin: 6px;
          box-sizing: border-box;
          border-radius: 8px;
          transition: all 0.3s ease-in-out;
          &:hover{
            cursor: pointer;
            background-color: rgba($color:  #c5c5c5, $alpha: 0.5);
          }
          img{
            width: 80%;
            height: 80%;
            display: inline-block;
            margin:  0 auto;
            vertical-align: middle;
          }
          &.active{
            background-color: #c5c5c5;
          }
        }
      }
      .user-menu{
        cursor: pointer;
      }
      .org-name,.user-name{
        display: inline-block;
        margin: 0 10px;
      }
    }
    .bottom-body{
      margin-top: 60px;
      display: flex;
      .menu{
        width: 200px;
        flex-shrink: 0;
        background-color: rgba(62, 128, 204, 0.1);
      }
      .body{
        flex-grow: 1;
        padding: 8px;
        box-sizing: border-box;
      }
    }
  }
}
</style>