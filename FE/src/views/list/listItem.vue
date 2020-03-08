<template>
  <el-card class="list-item" shadow="hover" :body-style="bodyStyle">
    <div class="item-content">
      <div class="icon iconfont" v-if="item.add" :class="addForm.type === 1 ? 'icon-shourusel' : 'icon-zhichusel'" @click="handleIconClick"></div>
      <div class="icon iconfont" v-else :class="item.type === 1 ? 'icon-shourusel' : 'icon-zhichusel'"></div>
      <div class="item-info">
        <div class="amount">
          <input v-if="item.add" ref="amount" type="number" v-model="addForm.amount" placeholder="填写金额"></input>
          <template v-else>
            <i class="iconfont icon-jine"></i> {{item.amount}}
          </template>
        </div>
        <div class="remark">
          <input v-if="item.add" v-model="addForm.remark" placeholder="填写备注"></input>
          <template v-else>
            <i class="iconfont icon-remarks"></i> {{item.remark}}
          </template>
        </div>
      </div>
      <div class="item-time">
        <template v-if="item.add">
          <el-date-picker
            class="use-time"
            v-model="addForm.useTime"
            size="mini"
            type="date"
            value-format="yyyy-MM-dd"
            :clearable="false">
          </el-date-picker>
        </template>
        <div class="time" v-else>{{$dayjs(item.use_time).format('YYYY / M / D')}}</div>
      </div>
      <div class="item-add" v-if="item.add">
        <el-button type="success" icon="el-icon-check" plain circle size="small" @click="add"></el-button>
        <el-button type="warning" icon="el-icon-close" plain circle size="small" @click="handleClose"></el-button>
      </div>
      <div class="item-delete" v-else>
        <el-button type="danger" icon="el-icon-delete" plain circle size="small" @click="fdelete(item.id)"></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { add, fdelete } from '@/api/financial'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      name: 'listItem',
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      const today = this.$dayjs().format('YYYY-MM-DD')
      return {
        addForm: {
          amount: '',
          remark: '',
          useTime: today,
          type: 1
        },
        bodyStyle: {
          padding: '10px',
          cursor: 'pointer',
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created(){
      if(this.item.add) this.bodyStyle['background-color'] = '#ecf5ff'
    },
    mounted(){
      if(this.item.add) this.focus()
    },
    methods: {
      add(){
        if(!this.addForm.amount || this.addForm.amount <= 0) return this.$notify.error('请填写正确的金额')
        const data = {
          accountId: this.userInfo.id,
          ...this.addForm
        }
        add(data).then(res => {
          this.$notify.success(res.msg)
          this.$emit('add')
        })
      },
      fdelete(id){
        this.$confirm('确认删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fdelete({id}).then(res => {
            this.$notify.success(res.msg)
            this.$emit('delete')
          })
        }).catch(() => {})
      },
      focus(){
        this.$refs.amount.focus()
      },
      handleClose(){
        this.$emit('cancel')
      },
      handleIconClick(){
        if(this.addForm.type === 1) {
          this.addForm.type = 2
        } else {
          this.addForm.type = 1
        }
      }
    }
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
      flex-shrink: 0;
      &.icon-shourusel{
        color: #3E80CC;
      }
      &.icon-zhichusel{
        color: #c53C3C;
      }
    }
    .item-info{
      flex-grow: 1;
      input{
        border: none;
        outline: none;
        padding-left: 10px;
        box-sizing: border-box;
        width: 100%;
        background-color: #ecf5ff;
      }
      .amount{
        font-size: 20px;
        font-weight: bold;
        line-height: 28px;
        white-space: nowrap;
        input{
          font-weight: bold;
        }
        .iconfont{
          font-size: 20px;
        }
      }
      .remark{
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        font-size: 14px;
        .iconfont{
          font-size: 14px;
        }
      }
    }
    .item-time{
      height: 50px;
      line-height: 50px;
      flex-grow: 1;
      padding-right: 10px;
      .use-time{
        display: inline-block;
        vertical-align: middle;
        width: 32px;
        height: 32px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #fff;
        &::v-deep .el-input__inner{
          display: none;
        }
        &::v-deep .el-input__prefix{
          width: 32px;
          line-height: 32px;
          left: 0;
        }
      }
      .time{
        text-align: right;
        line-height: 50px;
        width: 98px;
        flex-shrink: 0;
      }
    }
    .item-delete{
      height: 50px;
      line-height: 50px;
    }
    .item-add{
      height: 50px;
      line-height: 50px;
      width: 82px;
      flex-shrink: 0;
    }
  }
}
</style>