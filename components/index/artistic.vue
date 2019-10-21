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
        :key="index">
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
      list: {
        all: [
          {
            title:"晓本烘焙·茶本铺（东方广场店）",
            img:'https://p0.meituan.net/msmerchant/36cbbb3fe477d86bc7bf45714724b5f6405667.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"晓本烘焙·茶本铺（东方广场店）",
            img:'https://p0.meituan.net/msmerchant/36cbbb3fe477d86bc7bf45714724b5f6405667.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"晓本烘焙·茶本铺（东方广场店）",
            img:'https://p0.meituan.net/msmerchant/36cbbb3fe477d86bc7bf45714724b5f6405667.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"晓本烘焙·茶本铺（东方广场店）",
            img:'https://p0.meituan.net/msmerchant/36cbbb3fe477d86bc7bf45714724b5f6405667.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"晓本烘焙·茶本铺（东方广场店）",
            img:'https://p0.meituan.net/msmerchant/36cbbb3fe477d86bc7bf45714724b5f6405667.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"晓本烘焙·茶本铺（东方广场店）",
            img:'https://p0.meituan.net/msmerchant/36cbbb3fe477d86bc7bf45714724b5f6405667.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          }
        ],
        part: [
          {
            title:"约会聚餐",
            img:'https://p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"约会聚餐",
            img:'https://p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"约会聚餐",
            img:'https://p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"约会聚餐",
            img:'https://p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"约会聚餐",
            img:'https://p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"约会聚餐",
            img:'https://p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          }
        ],
        spa: [
          {
            title:"丽人SPA",
            img:'https://p1.meituan.net/merchantpic/19d7ad2f8e4753a50442226610af0074506930.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"丽人SPA",
            img:'https://p1.meituan.net/merchantpic/19d7ad2f8e4753a50442226610af0074506930.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"丽人SPA",
            img:'https://p1.meituan.net/merchantpic/19d7ad2f8e4753a50442226610af0074506930.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"丽人SPA",
            img:'https://p1.meituan.net/merchantpic/19d7ad2f8e4753a50442226610af0074506930.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"丽人SPA",
            img:'https://p1.meituan.net/merchantpic/19d7ad2f8e4753a50442226610af0074506930.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"丽人SPA",
            img:'https://p1.meituan.net/merchantpic/19d7ad2f8e4753a50442226610af0074506930.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          }
        ],
        movie: [
          {
            title:"电影演出",
            img:'https://p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"电影演出",
            img:'https://p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"电影演出",
            img:'https://p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"电影演出",
            img:'https://p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"电影演出",
            img:'https://p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"电影演出",
            img:'https://p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          }
        ],
        travel: [
          {
            title:"品质出游",
            img:'https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"品质出游",
            img:'https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"品质出游",
            img:'https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"品质出游",
            img:'https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"品质出游",
            img:'https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          },
           {
            title:"品质出游",
            img:'https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
            pos:'星座生日蛋糕1个，约6英寸，圆形',
            price:'268'
          }
        ]
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  
  },
  methods: {
    enter(e){
      this.kind = e.target.getAttribute('kind')
    }
  },

};
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
