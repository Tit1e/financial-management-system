<template>
  <div class="list" v-loading="loading">
    <el-form ref="searchForm" size="small" :model="searchForm" inline @keyup.native.entr="getList()">
      <el-form-item>
        <el-radio-group v-model="searchForm.type" @change="getList(1)">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button :label="1">收入</el-radio-button>
          <el-radio-button :label="2">支出</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.useTime"
          format="yyyy / M / d"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          clearable>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.remark" placeholder="备注" prefix-icon="el-icon-tickets" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()" icon="el-icon-search">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="addDetail" icon="el-icon-plus">添 加</el-button>
      </el-form-item>
      <el-row v-show="pageData.pageSize < total">
        <el-col :span="24">
          <el-form-item>
          <el-pagination
            hide-on-single-page
            layout="total, sizes, prev, pager, next"
            :current-page="pageData.pageIndex"
            :page-sizes="[100, 150, 200, 300]"
            :page-size="100"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="getList">
          </el-pagination>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
        <list-item :item="item" @cancel="cancel" @delete="getList(pageData.pageIndex)" @add="getList(pageData.pageIndex)"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import listItem from './listItem'
  import { list } from '@/api/financial'
  import { mapGetters } from 'vuex'
  export default {
    name: 'detail',
    components: {listItem},
    data(){
      return{
        list: [],
        searchForm: {
          type: '',
          remark: '',
          useTime: ''
        },
        loading: false,
        total: 0,
        pageData: {
          pageSize: 100,
          pageIndex: 1
        },
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created(){
      this.getList()
    },
    methods: {
      getList(page = 1){
        this.loading = true
        this.pageData.pageIndex = page
        const data = {
          accountId: this.userInfo.id,
          ...this.searchForm,
          ...this.pageData
        }
        list(data).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      addDetail(data){
        let add = this.list.find(i => i.add)
        if(add) return this.$notify.warning('请先保存正在编辑的记录')
        this.list.unshift({
          add: true
        })
      },
      cancel(){
        this.list = this.list.filter(i => !i.add)
      },
      handleSizeChange(size){
        this.pageData.pageSize = size
        this.getList(this.pageData.pageIndex)
      },
    }
  }
</script>

<style lang="scss" scoped>
.list{
  .el-form{
    .el-radio-group{
      display: block;
    }
  }
}
</style>