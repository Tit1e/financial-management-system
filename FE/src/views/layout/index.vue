<template>
  <el-container class="right-content">
    <el-main>
      <div class="top-header">
        <div class="header-wrap">
          <div class="menu-wrap">
            <router-link class="menu" :class="$route.name === item.route ? 'active' : ''" tag="div" :to="'/' + item.route" :title="item.title" v-for="item in menus" :key="item.route">
              <img :src="item.icon"></span>
            </router-link>
          </div>
          <router-link class="title" tag="span" to="/dashboard"><span class="iconfont icon-licai"></span> 家庭财务管理系统</router-link>
          <div class="right-block">
            <span style="margin-right: 10px;">
            </span>
            <el-button type="text" size="large" @click="outLogin">退出登录</el-button>
          </div>
        </div>
      </div>
      <div class="bottom-body">
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
import { mapGetters } from 'vuex'
import { outLogin } from '@/api/login.js'
import { removeToken } from '@/utils/cookie.js'
import dashboard from '@/assets/svg/dashboard.svg'
import list from '@/assets/svg/list.svg'
import setting from '@/assets/svg/setting.svg'
export default {
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
          route: 'list',
          icon: list
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
      .header-wrap{
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .title{
          flex-grow: 1;
          font-weight: bold;
          font-weight: 900;
          font-size: 20px;
          color: #3E80CC;
          letter-spacing: 0.1em;
          line-height: 60px;
          vertical-align: middle;
          text-align: center;
          cursor: pointer;
          .icon-licai{
            font-size: 40px;
            vertical-align: middle;
          }
        }
        .menu-wrap{
          width: 180px;
          display: flex;
          .menu{
            text-align: center;
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
        .right-block{
          width: 180px;
          padding-right: 10px;
          text-align: right;
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
        .el-card{
          max-width: 1200px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>