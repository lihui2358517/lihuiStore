<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <categroy :types="types" :areas="areas" />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap v-if="point.length" :width="230" :height="290" :point="point" />
    </el-col>
  </el-row>
</template>
<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: []
    }
  },

  watch: {
    '$route'(to, from) {
      this.getData()
    }
  },
  methods: {
    getData: async function() {
      let keyword = this.$route.query.keyword
      let city = this.$store.state.geo.position.city
      let { status, data: { count, pois } } = await this.$axios.get('/search/resultsByKeywords', {
        params: {
          keyword,
          city
        }
      })
      let { status: status2, data: { areas, types } } = await this.$axios.get('/categroy/crumbs', {
        params: {
          city
        }
      })
     
      if (status === 200 && count > 0 && status2 === 200) {
        this.list = pois.filter(item => item.photos.length).map(item => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        })
        this.keyword = keyword
        this.areas = areas.filter(item => item.type !== '').slice(0, 5)
        this.types = types.filter(item => item.type !== '').slice(0, 5)
        this.point = (pois.find(item => item.location).location || '').split(',')
        // console.log(this.list,111)
      }
    }
  },
  //这里存在一个问题asyncData是在浏览器上运行的，当浏览器切换地址时，会执行，但是路由切换时就不会执行
  //1. 在产品列表页换个keyword不会执行，这是大bug啊，所以还在写在created里吧,但是后来我试了，写在created里也没有加载，可能是同一组件，所以created只会执行一遍
  //2. 这里的解决办法是用a标签跳转，store数据同时也存入seseesion中,但是node上写cookie也感觉很麻烦
  //3. 不用a标签，把方法再在mounted执行,不管是created还是mounted,同一组件都不会再次执行，这里用watch监听路由，好办法啊
  async asyncData(ctx) {
    let keyword = ctx.query.keyword
    let city = ctx.store.state.geo.position.city
    let { status, data: { count, pois } } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    let { status: status2, data: { areas, types } } = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    if (status === 200 && count > 0 && status2 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map(item => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    }
  },
};

</script>
<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
