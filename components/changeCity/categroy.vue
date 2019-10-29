<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c" @click='goHome(c)'>{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data(){
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    }
  },
  async mounted(){
    let self=this;
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city');
    if(status===200){
      let p
      let c
      let d={}
      city.forEach(item=>{
        p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        if(!d[p]){
            d[p]=new Array();
          }
          d[p].push(item.name)
      })
      //Object.entries 一个对象的键值以数组的形式遍历出来
      for(let [k,v] of Object.entries(d)){
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block=blocks
    }
  },
  methods:{
  	goHome:async function(city){
  		let province = this.$store.state.geo.position.province;
      	this.$store.dispatch('geo/setPosition',{city, province})
        const {status:status3,data:{result}}=await this.$axios.get('/search/hotPlace',{
          params:{
            city:city.replace('市','')
          }
        })
        this.$store.dispatch('home/setHotPlace',status3===200?result:[])
      	this.$router.push('/')
  	}
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
