<!-- by your name -->
<template>
  <div class='cartcontrol'>
    <!-- 给减少按钮和计数元素添加动画 -->
    <transition name="is-show">
      <!-- 减少按钮 -->
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <i class="icon-remove_circle_outline"></i>
      </div>

    </transition>

    <transition name="num-show">
      <!-- 显示数量 -->
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>

    <!-- 增加按钮 -->
    <div class="cart-add" @click="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "cartcontrol",

  props: {
    food: {
      type: Object
    }
  },

  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.cartcontrol {
  font-size: 0;

  .cart-decrease,
  .cart-add {
    display: inline-block;
    color: rgb(0, 160, 220);
    font-size: 24px;
    vertical-align: middle;
  }

  .cart-count {
    display: inline-block;
    width: 24px;
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    text-align: center;
    vertical-align: middle;
  }

  // 定义detail显示隐藏时的过渡效果
  .is-show-enter-active,
  .is-show-leave-active {
    transition: all 0.3s ease;
  }

  .is-show-enter,
  .is-show-leave-to {
    transform: translateX(200%);
    opacity: 0;
  }

  .num-show-enter-active,
  .num-show-leave-active {
    transition: all 0.3s ease;
  }
  .num-show-enter,
  .num-show-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>