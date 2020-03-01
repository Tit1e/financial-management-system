<template>
  <div>
    <template v-if="Menu.children">
      <el-submenu :index="Menu.path">
        <template slot="title">
          <i :class="Menu.meta.icon"></i> {{Menu.meta.title}}
        </template>
        <router-link
          tag="span"
          v-for="(menu,index) in Menu.children"
          :to="menu.path"
          :key="index">
          <el-menu-item :index="menu.path">{{menu.meta.title}}</el-menu-item>
        </router-link>
      </el-submenu>
    </template>
    <template v-else-if="!Menu.children && Menu.path">
      <router-link tag="span" :to="Menu.path" v-if="!Menu.meta.show">
        <el-menu-item :index="Menu.path">
          <template slot="title"><i :class="Menu.meta.icon"></i> {{Menu.meta.title}}</template>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    menuItem: {
      type: Object
    }
  },
  computed: {
    Menu() {
      if (this.menuItem.children) {
        let _menuItem = {...this.menuItem}
        _menuItem.children = _menuItem.children.filter(i => i.meta.show !== false)
        if (_menuItem.children.length > 1) {
          return _menuItem
        } else if(_menuItem.children.length === 1) {
          return {
            ..._menuItem.children[0],
            meta: { ..._menuItem.children[0].meta, ..._menuItem.meta }
          }
        }else{
          return {}
        }
      } else {
        return this.menuItem
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-submenu, .el-menu-item{
  .iconfont{
    color: #2c3e50;
  }
}
</style>