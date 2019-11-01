<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        @click='handleSelect(item)'>{{ item.name==='市辖区'?item.province:item.name }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  methods:{
    handleSelect:async function(item){
      let province = this.$store.state.geo.position.province;
      let value = item.name==='市辖区'?item.province:item.name
      this.$store.dispatch('geo/setPosition',{city:value, province})
      const {status:status3,data:{result}}=await this.$axios.get('/search/hotPlace',{
        params:{
          city:value.replace('市','')
        }
      })
      this.$store.dispatch('home/setHotPlace',status3===200?result:[])
      //这里不能用$router.go()或location.href，用这两个方法，页面刷新，store数据重置，用push只是路由间的跳转，数据不会重置
      this.$router.push('/')
    }
  },
  async mounted(){
    let {status,data:{hots}}=await this.$axios.get('/geo/hotCity')
    if(status===200){
      this.list=hots
    }
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
