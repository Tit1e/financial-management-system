<template>
  <el-card class="list-item" shadow="hover" :body-style="bodyStyle">
    <div class="item-content">
      <div class="icon iconfont" :class="item.type === '1' ? 'icon-shourusel' : 'icon-zhichusel'"></div>
      <div class="item-info">
        <div class="amount"><i class="iconfont icon-jine"></i> {{item.amount}}</div>
        <div class="remark"><i class="iconfont icon-remarks"></i> {{item.remark}}</div>
        <!-- <div><i class="el-icon-time"></i> {{$dayjs(item.create_time).format('YYYY-MM-DD')}}</div> -->
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      name: 'listItem',
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        bodyStyle: {
          padding: '10px',
          cursor: 'pointer'
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.list-item{
  margin-bottom: 10px;
  .item-content{
    display: flex;
    .icon{
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 40px;
      text-align: center;
      &.icon-shourusel{
        color: #3E80CC;
      }
      &.icon-zhichusel{
        color: #c53C3C;
      }
    }
    .item-info{
      .amount{
        font-size: 20px;
        font-weight: bold;
        .iconfont{
          font-size: 20px;
        }
      }
      .remark{
        font-size: 14px;
        .iconfont{
          font-size: 14px;
        }
      }
    }
  }
}
</style>