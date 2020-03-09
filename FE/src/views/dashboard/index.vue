<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card :body-style="bodyStyle">
          <div class="filter-box">
            <el-radio-group v-model="pieFilter" size="mini" @change="setPie">
              <el-radio-button :label="key" v-for="(value, key) in pieMap" :key="key">{{value}}</el-radio-button>
            </el-radio-group>
          </div>
          <v-chart :options="pieOptions" theme="macarons" autoresize/>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card :body-style="bodyStyle">
          <div class="filter-box">
            <el-radio-group v-model="barFilter" size="mini" @change="setBar">
              <el-radio-button :label="key" v-for="(value, key) in barMap" :key="key">{{value}}</el-radio-button>
            </el-radio-group>
          </div>
          <v-chart :options="barOptions" theme="macarons" autoresize/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/geo'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/theme/macarons'
  import { dashboard } from '@/api/financial'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        bodyStyle: { padding: '10px', height: '300px', position: 'relative' },
        pieFilter: 'day',
        pieData: {},
        pieOptions: {
          title: {
            text: '收支占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['支出', '收入']
          },
          series: {
            name: '总计',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        },
        barFilter: 'week',
        barData: {},
        barOptions: {
          title: {
            text: '收支统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            left: 'left',
            data: ['支出', '收入']
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              interval: 50,
              axisLabel: {
                formatter: '{value} 元'
              }
            },
          ],
          series: [
            {
              name: '支出',
              type: 'bar',
              data: []
            },
            {
              name: '收入',
              type: 'bar',
              data: []
            },
          ]
        },
        pieMap: {
          'day': '日',
          'week': '周',
          'month': '月',
          'year': '年'
        },
        barMap: {
          'day': '日',
          'week': '周',
          'month': '月',
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created(){
      this.getData()
    },
    methods: {
      getData(){
        dashboard({ accountId: this.userInfo.id }).then(res => {
          this.pieData = res.data.pieData
          this.barData = res.data.barData
          this.setPie(this.pieFilter)
          this.setBar(this.barFilter)
        })
      },
      setPie(type = 'day'){
        const data = this.pieData[type]
        this.pieOptions.series.data = data
      },
      setBar(type = 'day'){
        const data = this.barData[type]
        this.barOptions.xAxis[0].data = data.dates
        this.barOptions.series[0].data = data[1]
        this.barOptions.series[1].data = data[2]
      }
    }
  }
</script>

<style lang="scss" scoped>
.dashboard{
  padding: 10px;
  .echarts {
    width: 100%;
    height: 100%;
  }
  .filter-box{
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
    .el-radio-group{
      &::v-deep .el-radio-button--mini{
        .el-radio-button__inner{
          padding: 4px 6px!important;
        }
      }
    }
  }
}
</style>