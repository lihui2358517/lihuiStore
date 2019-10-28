<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class='left'>
        <img src="../../../assets/img/web-logo.png" alt="美团">
      </el-col>
      <el-col class='center' :span="15">
        <div class="wrapper">
          <el-input v-model='search' placeholder='搜索商家或地点' @focus='focus' @blur='blur' @input='input($emit)'></el-input>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl class="hotPlace" v-if='isHotPlace'>
            <dt>热门搜索</dt>
            <dd v-for='(item,idx) in $store.state.home.hotPlace.slice(0,5)' :key='idx'>
              <a href="javascript:;" @click='goProduct(item.name)'>{{ item.name }}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if='isSearchList'>
            <dd v-for='(item,idx) in searchList' :key='idx'>
              <a href="javascript:;" @click='goProduct(item.name)'>{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <div class="suggest">
          <a v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx" href="javascript:;" @click='goProduct(item.name)'>{{ item.name }}</a>
        </div>
        <ul class="nav">
          <li>
            <nuxt-link to='/' class='takeout'>美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/' class='movie'>猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/' class='hotel'>美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/' class='apartment'>民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to='/' class='business'>商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col class='right' :span='6'>
        <ul class="security">
          <li><i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li><i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li><i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      search: '',
      isFocus: false,
      hotPlace: [],
      searchList: [],
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      let self = this;
      setTimeout(function() {
        self.isFocus = false
      }, 200)

    },
    goProduct(key){
    	this.$router.push('/products?keyword='+encodeURIComponent(key))
    },
    input: _.debounce(async function() {
      let self = this;
      let city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = []
      let { status, data: { top } } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      self.searchList = top.slice(0, 10)
    }, 300)
  }
};

</script>
