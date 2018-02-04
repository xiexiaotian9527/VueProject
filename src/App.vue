<!-- by your name -->
<template>
  <div class='app'>
    <!-- 头部组件部分 -->
    <my-header :sellerData="sellerData"></my-header>

    <!-- 路由导航部分 -->
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>

    <!-- 路由视图组件部分 -->
    <keep-alive>
      <router-view :seller-data="sellerData" :ratings-data="ratingsData"></router-view>
    </keep-alive>

  </div>
</template>

<script>
import Header from "@/components/header/header";

// 引入vuex数据map
import { mapState, mapMutations } from "vuex";

export default {
  name: "app",
  components: {
    MyHeader: Header
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(["sellerData", "goodsData", "ratingsData"])
  },

  methods: {
    ...mapMutations(["initData"])
  },

  created: function() {
    // 获取商家数据信息，提交给vuex进行处理
    this.$axios.get("../data.json").then(
      res => {
        // 将数据传递给vuex中的mutations事件处理
        this.initData(res.data);
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "./common/styles/mixin.scss";

body,
html {
  font-weight: 200;
  font-family: "PingFang SC", "STHeitiSC-light", "Microsoft Yahei";
}

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  @include border-1px(rgba(7, 17, 27, 0.1));
  line-height: 40px;
  font-size: 14px;
  color: #4d555d;

  .tab-item {
    flex: 1;
    text-align: center;
  }

  .router-link-active {
    color: #f01414;
  }
}
</style>
