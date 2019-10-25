

//vue components 共享数据
const state = () => ({menu: []})



//设置修改state 在这里相当于注册了相关事件，在actions或vue中以对应的type触发
const mutations = {
  setMenu(state, val) {
    state.menu = val
  }
}


//vue components 操作 提交mutations
const actions = {
	//这里用到了es6的解构负值
	//{commit} = state = {commit,...}
  setMenu:function({commit}, val){
    commit('setMenu', val)
  }
}


//如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true
export default {namespaced: true, state, mutations, actions}