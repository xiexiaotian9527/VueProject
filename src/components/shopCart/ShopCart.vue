<!-- by your name -->
<template>
  <div class='shop-cart'>
    <div class="content">
      <!-- 购物车左侧内容 -->
      <div class="content-left">
        <!-- 购物车图标 -->
        <div class="logo-wrap">
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
        <div class="pay" :class="{'highlight': totalPrice >= minPrice}">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shop-cart",

  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 15,
            count: 3
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
    return {};
  },

  components: {},

  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
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
    }
  },

  methods: {},

  created() {}
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.shop-cart {
  position: fixed;
  z-index: 50;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;

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
}
</style>