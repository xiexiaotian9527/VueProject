import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 定义state对象的初始内容
const state = {
  sellerData: {},
  goodsData: [],
  ratingsData: []
};

// vuex的计算属性
const getters = {}

// 定义vuex的同步事件方法
const mutations = {
  initData(state, data) {
    //初始化页面所需的商家数据
    state.sellerData = data.seller;
    state.goodsData = data.goods;
    state.ratingsData = data.ratingsr;
  },
}

// vuex的异步事件方法
const actions = {}

// 向外提供vue接口
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
