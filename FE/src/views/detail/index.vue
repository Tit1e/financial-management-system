<template>
  <div class="detail">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
        <list-item :item="item"/>
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
        list: []
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
    }
  }
</script>

<style lang="scss" scoped>

</style>