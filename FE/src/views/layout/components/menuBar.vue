<template>
  <el-menu :default-active="$route.path" background-color="#E5EBF3" text-color="#2c3e50" active-text-color="#3E80CC" @select="$emit('select')" unique-opened>
    <menu-item v-for="item in Menus" :menuItem="item" :key='item.name'/>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import menuItem from './menuItem'
export default {
  components: { menuItem },
  computed: {
    ...mapGetters(['menus', 'roleInfo']),
    Menus(){
      let menus = JSON.parse(JSON.stringify(this.menus)).filter(i => {
        return i.meta.show !== false
      })
      if(this.roleInfo.admin !== 1){
        menus = menus.filter(i => {
          return i.name !== 'rolesManage' && i.name !== 'accountManage'
        })
      }
      if(this.roleInfo.permission !== 1){
        menus = menus.filter(i => {
          return i.name !== 'publicDetail'
        })
      }
      return menus
    }
  },
}
</script>

<style scope lang="scss">
.el-menu{
  .icon-caidan{
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
}
.el-aside{
  background-color: #fff;
  box-shadow: 2px 0 10px rgba(0,0,0,.2);
  z-index: 9;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>