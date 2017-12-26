<!-- by your name -->
<template>
    <transition name="food-show">
        <div class='food' v-show="showFlag" ref="foodWrap">
            <div class="food-content">
                <!-- 头部图片区域 -->
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>

                <!-- 商品内容区域 -->
                <div class="content">
                    <!-- 标题 -->
                    <h1 class="title">{{food.name}}</h1>
                    <!-- 描述 -->
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <!-- 价格 -->
                    <div class="price">
                        <span class="now">
                            <i>￥</i>{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">
                            <i>￥</i>{{food.oldPrice}}</span>
                    </div>
                    <!-- 添加购物车按钮 -->

                    <div class="cart-control-wrap">

                        <!-- 该商品已添加进购物车则显示CartControl组件 -->
                        <cart-control :food="food" class="cart-control" v-show="food.count"></cart-control>

                        <!-- 该商品未添加进购物车中则显示首次加入购物车组件 -->
                        <transition name="add-cart-show">
                            <div class="add-cart" v-show="!food.count || food.count===0" @click="addFirst()">加入购物车</div>
                        </transition>
                    </div>

                </div>

                <!-- 商品介绍区域 -->
                <div class="info-wrap">
                    <h1 class="info-header">商品介绍</h1>
                    <div class="info-content" v-if="food.info">
                        {{food.info}}
                    </div>
                    <div class="info-content" v-else>
                        此商品还未添加商品介绍
                    </div>
                </div>

                <!-- 评价区域 -->
                <div class="rating-wrap">

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from "better-scroll";
import Vue from "vue";

import CartControl from "@/components/cartControl/CartControl";

export default {
  name: "food",

  props: {
    food: {
      type: Object
    }
  },

  data() {
    return {
      showFlag: false
    };
  },

  components: {
    CartControl
  },

  computed: {},

  methods: {
    show() {
      // 显示food组件
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodWrap, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      // 隐藏food组件
      this.showFlag = false;
    },
    addFirst(event) {
      // 首次添加购物车用到的函数
      //   如果该购物车中没有选中该商品的数量，商品购买计数就设为1，否则就再增加一个计数
      if (!this.food.count) {
        //   这里使用引入vue实例的set方法设置第一次添加的商品数量，防止vue有时不能及时识别对象属性被添加造成页面无法同步响应的问题
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    }
  },

  created() {}
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #f3f5f7;

  .food-content {
    .image-header {
      position: relative;

      img {
        width: 100%;
      }

      .back {
        position: absolute;
        top: 10px;
        left: 0;
        padding: 10px;
        font-size: 20px;
        color: #ffffff;
      }
    }

    .content {
      position: relative;
      padding: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background-color: #ffffff;
      font-size: 0;

      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .detail {
        margin-top: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;

        .sell-count {
          margin-right: 12px;
        }

        .rating {
        }
      }

      .price {
        margin-top: 18px;

        .now {
          margin-right: 12px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;

          i {
            font-size: 10px;
            font-weight: normal;
          }
        }

        .old {
          font-size: 10px;
          font-weight: 700;
          color: rgb(147, 153, 159);
          line-height: 24px;
          text-decoration: line-through;
          i {
            font-weight: normal;
          }
        }
      }

      .cart-control-wrap {
        position: absolute;
        right: 18px;
        bottom: 18px;

        .cart-control {
        }

        .add-cart {
          width: 74px;
          height: 24px;
          border-radius: 12px;
          background-color: rgb(0, 160, 220);
          font-size: 10px;
          color: rgb(255, 255, 255);
          line-height: 24px;
          text-align: center;
        }
      }
    }

    .info-wrap {
      margin-top: 16px;
      padding: 18px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-width: 1px 0;
      background-color: #ffffff;
      .info-header {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .info-content {
        padding: 6px 8px 0 8px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77, 85, 93);
        line-height: 24px;
      }
    }

    .rating-wrap {
      margin-top: 16px;
      padding: 18px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-width: 1px 0;
      background-color: #ffffff;
    }
  }
}
// 控制food组件显示隐藏的特效
.food-show-enter-active,
.food-show-leave-active {
  transition: all 0.2s;
}
.food-show-enter,
.food-show-leave-to {
  transform: translateX(100%);
}

// 控制添加购物车组件显示隐藏的特效
.add-cart-show-enter-active,
.add-cart-show-leave-active {
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all 1s;
}
.add-cart-show-enter,
.add-cart-show-leave-to {
  opacity: 0;
}
</style>