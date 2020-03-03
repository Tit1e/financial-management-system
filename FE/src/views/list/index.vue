<template>
  <div class="detail">
    <el-form :model="searchForm" ref="searchForm" inline>
      <el-form-item>
        <el-radio-group v-model="searchForm.type">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">收入</el-radio-button>
          <el-radio-button label="2">支出</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.create_time"
          format="yyyy / M / d"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.remark" placeholder="备注" prefix-icon="el-icon-tickets"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList" icon="el-icon-search">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="addDetail" icon="el-icon-plus">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
        <list-item :item="item" @cancel="cancel"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import listItem from './listItem'
  export default {
    name: 'detail',
    components: {listItem},
    data(){
      return{
        list: [],
        searchForm: {
          type: '',
          remark: '',
          create_time: ''
        }
      }
    },
    created(){
      for(let i = 0; i < 100; i++){
        this.list.push({
            id: i,
            type: Math.random() > 0.5 ? '1' : '2',
            amount: (Math.random() * 100).toFixed(2),
            remark: '生活用品',
            status: '1',
            modify_history: [
              '2020-01-01: 11:11:11 修改金额'
            ],
            create_time: 1577823071000
          })
      }
    },
    methods: {
      getList(){},
      addDetail(){
        let add = this.list.find(i => i.add)
        if(add) return this.$notify.warning('请先保存正在编辑的记录')
        this.list.unshift({
          add: true
        })
      },
      cancel(){
        this.list = this.list.filter(i => !i.add)
      },
    }
  }
</script>

<style lang="scss" scoped>
.detail{
  .el-form{
    margin-bottom: 10px;
    .el-radio-group{
      display: block;
    }
  }
}
</style>