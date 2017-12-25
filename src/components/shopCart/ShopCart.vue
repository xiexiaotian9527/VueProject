<!-- by your name -->
<template>
  <div class='shop-cart'>
    <!-- 购物车主内容 -->
    <div class="content">
      <!-- 购物车左侧内容 -->
      <div class="content-left">
        <!-- 购物车图标 -->
        <div class="logo-wrap" @click="toggleList">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>

        <!-- 购物车中合计价格 -->
        <div class=" price " :class="{ 'highlight': totalPrice> 0}">￥{{totalPrice}}</div>

        <!-- 另需配送费 -->
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>

      <!-- 购物车右侧内容 -->
      <div class="content-right">
        <div class="pay" :class="{'highlight': totalPrice >= minPrice}" @click="pay">{{payDesc}}</div>
      </div>
    </div>

    <transition name="slide-list">
      <!-- 购物车列表 -->
      <div class="shop-cart-list" v-show="listShow">
        <!-- 列表头部 -->
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="emptyList">清空</span>
        </div>

        <!-- 列表内容 -->
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in selectFoods" :key="index" v-show="food.count">
              <div class="name">{{food.name}}</div>
              <div class="price">
                <i>￥</i>{{food.price * food.count}}
              </div>

              <cart-control class="cart-control" :food="food"></cart-control>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="list-mask">
      <!-- 列表背景层 -->
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import CartControl from "@/components/cartControl/CartControl";

export default {
  name: "shop-cart",

  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: false
    };
  },

  components: {
    CartControl
  },

  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        if (food.count) {
          total += food.price * food.count;
        }
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        if (food.count) {
          count += food.count;
        }
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return "￥" + this.minPrice + "元起送";
      } else if (this.totalPrice < this.minPrice) {
        return "还差￥" + (this.minPrice - this.totalPrice) + "元起送";
      } else {
        return "去结算";
      }
    },
    listShow() {
      // 如果没有选择任何商品，则折叠list-content的内容
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }

      // 如果选择有商品，次函数就是切换显示隐藏
      let show = !this.fold;
      return show;
    }
  },

  methods: {
    toggleList() {
      //  如果没有选中任何商品，则终止这个函数
      if (!this.totalCount) {
        return;
      }

      // 有商品就切换列表的显示隐藏
      this.fold = !this.fold;
    },
    emptyList() {
      //清空购物车列表
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideList() {
      // 隐藏折叠购物车列表区域
      this.fold = true;
    },
    pay() {
      // 点击结算的事件
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert("需要支付" + this.totalPrice + "元");
    }
  },

  created() {}
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../common/styles/mixin.scss";

.shop-cart {
  position: fixed;
  z-index: 50;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;

  // 购物车主要内容区
  .content {
    display: flex;
    background-color: #141d27;
    height: 100%;

    .content-left {
      flex: 1;
      font-size: 0;

      .logo-wrap {
        display: inline-block;
        position: relative;
        top: -8px;
        height: 50px;
        width: 50px;
        margin: 0 15px;
        border-radius: 50%;
        background-color: #141d27;
        vertical-align: middle;

        .logo {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border: 6px solid #141d27;
          border-radius: 50%;
          background-color: #2b343c;
          color: rgba(255, 255, 255, 0.4);
          font-size: 24px;
          line-height: 38px;
          text-align: center;
          &.highlight {
            background-color: rgb(0, 160, 222);
            color: #fff;
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0 6px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 700;
          line-height: 16px;
          color: rgb(255, 255, 255);
          background-color: rgb(240, 20, 20);
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
          vertical-align: middle;
        }
      }

      .price {
        display: inline-block;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.4);
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        vertical-align: middle;
        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        padding-left: 12px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        font-weight: normal;
        line-height: 24px;
        vertical-align: middle;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.4);
        padding: 0 8px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        font-weight: 700;
        line-height: 50px;
        text-align: center;
        &.highlight {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }

  // 购物车列表区
  .shop-cart-list {
    position: fixed;
    z-index: -1;
    bottom: 0;
    left: 0;
    max-height: 270px;
    width: 100%;

    .list-header {
      box-sizing: border-box;
      height: 40px;
      width: 100%;
      padding: 0 18px;
      background-color: #f3f5f7;
      @include border-1px(rgba(7, 17, 27, 0.1));

      .title {
        float: left;
        font-size: 14px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 40px;
      }

      .empty {
        float: right;
        font-size: 14px;
        color: rgb(0, 160, 220);
        line-height: 40px;
      }
    }

    .list-content {
      background-color: #ffffff;
      max-height: 230px;
      padding: 0 18px 60px 18px;
      overflow: auto;

      .food {
        position: relative;
        box-sizing: border-box;
        height: 48px;
        padding: 12px 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        line-height: 24px;

        .name {
          color: rgb(7, 17, 27);
          font-size: 14px;
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          margin-left: 18px;
          font-size: 14px;
          color: rgb(240, 20, 20);
          font-weight: 700;

          i {
            font-size: 10px;
            font-weight: normal;
          }
        }

        .cart-control {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }

  // 购物车列表特效区
  .slide-list-enter-active,
  .slide-list-leave-active {
    transition: all 0.5s;
  }
  .slide-list-enter,
  .slide-list-leave-to {
    transform: translateY(100%);
  }

  // 购物车背景遮罩层区
  .list-mask {
    position: fixed;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.6);
  }

  .list-mask-enter-active,
  .list-mask-leave-active {
    transition: all 0.5s;
  }
  .list-mask-enter,
  .list-mask-leave-to {
    opacity: 0;
  }
}
</style>

