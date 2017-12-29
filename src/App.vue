<!-- by your name -->
<template>
  <div class='app'>
    <my-header :sellerData="sellerData"></my-header>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <router-view :seller-data="sellerData" :ratings-data="ratingsData"></router-view>
  </div>
</template>

<script>
import Header from "./components/header/Header";

export default {
  name: "app",
  
  data() {
    return {
      sellerUrl: "/api/seller",
      goodsUrl: "/api/goods",
      ratingsUrl: "/api/ratings",
      sellerData: {},
      goodsData: [],
      ratingsData: []
    };
  },

  components: {
    MyHeader: Header
  },

  computed: {},

  created: function() {
    // 获取商家信息
    this.$axios.get(this.sellerUrl).then(
      res => {
        this.sellerData = res.data.data;
      },
      err => {
        console.log(err);
      }
    );

    // 获取产品信息
    this.$axios.get(this.goodsUrl).then(
      res => {
        this.goodsData = res.data.data;
      },
      err => {
        console.log(err);
      }
    );

    // 获取评价信息
    this.$axios.get(this.ratingsUrl).then(
      res => {
        this.ratingsData = res.data.data;
      },
      err => {
        console.log(err);
      }
    );
  },

  methods: {
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
