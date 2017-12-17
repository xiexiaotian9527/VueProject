<!-- by your name -->
<template>
  <div class='app'>
    <my-header :sellerData="sellerData"></my-header>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/seller">商品</router-link>
      <router-link class="tab-item" to="/goods">评论</router-link>
      <router-link class="tab-item" to="/ratings">商家</router-link>
    </div>
    <router-view></router-view>
    <a @click="getData">点击获取seller</a>
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
      goodsData: {},
      ratingsData: {}
    };
  },

  components: {
    MyHeader: Header
  },

  computed: {},

  created: function() {
    this.$axios.get(this.sellerUrl).then(
      res => {
        this.sellerData = res.data.data;
      },
      err => {
        console.log(err);
      }
    );
  },

  methods: {
    getData() {
      this.$axios.get(this.sellerUrl).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
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
