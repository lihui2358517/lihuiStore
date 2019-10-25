import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // 页面渲染前的store处理 ,第二个参数是页面的context上下文对象
    //nuxt提供的fetch钩子和nuxtServerInit（均运行在服务端）起作用了，都能帮助我们在页面渲染（组件加载 ）前快速操作store。
    /*第二个参数context = {
      req, Node.js API的Request对象。如果nuxt以中间件形式使用的话，这个对象就根据你所使用的框架（个人理解为页面）而定。nuxt generate 不可用
      app, 包含所有插件的根实例。例如:想使用axios，可以通过context.app.$axios获取
    }*/
    async nuxtServerInit({ commit}, { req, app }) {
      const {status:statusGeo, data: { province,city}} = await app.$axios.get('/geo/getPosition')
      //commit 触发geo模板的mutations中的setPosition函数
      commit('geo/setPosition', statusGeo === 200 ? { city, province } : { city: '', province: '' })
      // console.log(province,city)
      const {status:statusMenu, data: { menu }} = await app.$axios.get('/geo/menu')
      //commit 触发geo模板的mutations中的setPosition函数
      commit('home/setMenu', statusMenu === 200 ?menu :[])
    }
  }
})

export default store
