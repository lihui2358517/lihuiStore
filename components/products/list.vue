<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="(item,idx) in nav"
        :key="item.name"
        :class="[item.name,current===idx?'s-nav-active':'']"
        @click="navSelect(idx,item.txt)"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <template v-for="(meta,idx) in sortList">
         <Item :key="idx" :meta="meta"/>
      </template>
     
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          sortType:'price'
        }, {
          name: 's-price',
          txt: '价格最低',
          sortType:'price'
        }, {
          name: 's-visit',
          txt: '人气最高',
          sortType:'comment'
        }, {
          name: 's-comment',
          txt: '评价最高',
          sortType:'rate'
        }
      ],
      current:0,
      sortList:[],
    }
  },
  async asyncData({app}) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  watch: {
    list() {
      this.sortList = this.list
    }
  },
  created(){
    this.sortList = this.list
  },
  methods: {
    navSelect: function (currentIdx,txt) {
      this.current = currentIdx;
      if (currentIdx == 0) {
        this.sortList.sort(function(a,b){return a.price - b.price})
      }else if (currentIdx == 1) {
        if (txt =='价格最低') {
          this.nav[1].txt = '价格最高'
          this.sortList.sort(function(a,b){ return b.price - a.price})
        }else{
          this.nav[1].txt = '价格最低'
          this.sortList.sort(function(a,b){return a.price - b.price})
        }
      }else{
        let currentSortType = this.nav[currentIdx].sortType;
        this.sortList.sort(function(a,b){return b[currentSortType] - a[currentSortType]})
      }
    }
  }
};
</script>
