<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点" @mouseenter='enter'>全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食" @mouseenter='enter'>约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人" @mouseenter='enter'>丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影" @mouseenter='enter'>电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游" @mouseenter='enter'>品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item,index) in cur"
        :key="index"
         @click='goDetail(item.title,item.pos)'>
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      keyword:'景点',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  created(){
    const obj = [
      {
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      },{
          title:"加载中···",
          pos:"加载中···",
          price:'暂无',
          img:require('../../assets/img/loading.jpg'),
          url:'//abc.com'
      }
      ]
    this.list = {
        all: obj,
        part: obj,
        spa: obj,
        movie: obj,
        travel: obj
    }

    
  },
  async mounted(){
    let self = this;
    let keyword = self.keyword
    let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
          params:{
            keyword,
            city:self.$store.state.geo.position.city
          }
        })
    if(status===200&&count>0){
      let r= pois.filter(item=>item.photos.length).map(item=>{
        return {
          title:item.name,
          pos:item.type.split(';')[0],
          price:item.biz_ext.cost||'暂无',
          img:item.photos[0].url,
          url:'//abc.com',
        }
      })
      self.list[self.kind]=r.slice(0,9)
    }else{
      self.list[self.kind]=[]
    }
  },
  methods: {
    enter:async function(e){
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if (tag === 'dd') {
        self.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
          params:{
            keyword,
            city:self.$store.state.geo.position.city
          }
        })
        if(status===200&&count>0){
          let r= pois.filter(item=>item.photos.length).map(item=>{
            return {
              title:item.name,
              pos:item.type.split(';')[0],
              price:item.biz_ext.cost||'暂无',
              img:item.photos[0].url,
              url:'//abc.com'
            }
          })
          self.list[self.kind]=r.slice(0,9)
        }else{
          self.list[self.kind]=[]
        }
      }

    },
    goDetail(keyword,pos){
      this.$router.push({
        path:'detail',
        query:{
          keyword,
          type:pos
        }
      })
    }

  },

};
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
