<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @click.native="handleSelect(item.label)"/>
    </el-select>
    <span class="name">&nbsp;&nbsp;&nbsp;&nbsp;直接搜索:</span>
    <!--fetch-suggestions相当于input  select是选择内容的时候触发-->
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import store from '@/store/index'
export default {
  data(){
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      cities:[]
    }
  },
  watch:{
    pvalue:async function(newPvalue){
      let self=this;
      let {status,data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue=''
      }
    }
  },
  mounted:async function(){
    
    let self=this;
    let {status,data:{province}}=await self.$axios.get('/geo/province')
    if(status===200){
      self.province=province.map(item=>{
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },
  methods:{
    //query输入的值，cb回调的参数
    querySearchAsync:_.debounce(async function(query,cb){
      let self=this;
      if(self.cities.length){
        //过滤，在全国城市中，把含有输入值的城市过滤出来
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data:{city}}=await self.$axios.get('/geo/city')
        if(status===200){
          self.cities=city.map(item=>{return {
            value:item.name
          }})
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
      }
    },200),
    handleSelect:function(item){
      console.log(item)
      let province = this.$store.state.geo.position.province;
      let value = typeof item === 'string'?item:item.value
      this.$store.dispatch('geo/setPosition',{city:value, province})
      //这里不能用$router.go()或location.href，用这两个方法，页面刷新，store数据重置，用push只是路由间的跳转，数据不会重置
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
