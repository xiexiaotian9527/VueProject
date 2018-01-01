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
import { urlParse } from "@/common/js/util.js";
import { saveToLocal, loadFromLocal } from "@/common/js/store.js";

import Header from "@/components/header/Header";

export default {
  name: "app",

  data() {
    return {
      sellerUrl: "/api/seller",
      goodsUrl: "/api/goods",
      ratingsUrl: "/api/ratings",
      sellerData: {
        id: (() => {
          var queryParam = urlParse();
          return queryParam.id;
        })()
      },
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
    this.$axios.get(this.sellerUrl + "?" + this.sellerData.id).then(
      res => {
        // 添加属性时要避开vue直接添加属性不会被页面检测到并响应的问题;
        for (let key in res.data.data) {
          this.$set(this.sellerData, key, res.data.data[key]);
        }
      },
      err => {
        console.log(err);
      }
    );

    // 获取产品信息
    this.$axios.get(this.goodsUrl).then(
      res => {
        for (let key in res.data.data) {
          this.$set(this.goodsData, key, res.data.data[key]);
        }
      },
      err => {
        console.log(err);
      }
    );

    // 获取评价信息
    this.$axios.get(this.ratingsUrl).then(
      res => {
        for (let key in res.data.data) {
          this.$set(this.ratingsData, key, res.data.data[key]);
        }
      },
      err => {
        console.log(err);
      }
    );
  },

  methods: {}
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
