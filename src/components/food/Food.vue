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
        <div class="ratings-wrap">

          <!-- 标题区域 -->
          <h1 class="title">商品评价</h1>

          <!-- rating-select模块区域 -->
          <rating-select :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" class="rating-select" @selectTypeChange="selectTypeChange" @toggleContent="toggleOnlyContent"></rating-select>

          <!-- 评价列表内容区域 -->
          <div class="rating-list">
            <!-- 有评价时显示的内容 -->
            <ul v-if="food.ratings && food.ratings.length">
              <li v-for="(rating, index) in food.ratings" :key="index" class="rating-item" v-show="needShow(rating.rateType, rating.text)">

                <!-- 用户信息 -->
                <div class="user">
                  <span class="user-name">{{rating.username}}</span>
                  <img class="user-avatar" :src="rating.avatar">
                </div>

                <!-- 评论时间 -->
                <div class="time">{{rating.rateTime | dateFormat}}</div>

                <!-- 评论内容 -->
                <div class="text">
                  <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}" class="icon"></span>
                  <span class="text-content" v-if="rating.text">{{rating.text}}</span>
                  <span class="text-content" v-else>暂无评价</span>
                </div>
              </li>
            </ul>
            <!-- 没有评价时显示的内容 -->
            <div class="no-rating" v-else>
              本菜品目前没有评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 引入插件和组件
import Vue from "vue";
import BScroll from "better-scroll";

// 引入处理时间戳的函数
import { formatDate } from "@/common/js/date.js";

// 引入vue模块
import CartControl from "@/components/cartControl/CartControl";
import RatingSelect from "@/components/ratingSelect/RatingSelect";

// 分别设置好评，差评和所有评价代表的常量，方便修改传入子组件的数值
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: "food",

  props: {
    food: {
      type: Object
    }
  },

  data() {
    return {
      showFlag: false,
      // 以下是传入RatingSelect组件的数据
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },

  filters: {
    dateFormat(time) {
      // 格式化时间戳的函数

      // 先将传入的时间戳字符串转换为一个Date对象
      let date = new Date(time);
      // 然后返回 引用外部的处理函数处理过的对象
      return formatDate(date, "yyyy--MM--dd hh:mm");
    }
  },

  components: {
    CartControl,
    RatingSelect
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
    },
    selectTypeChange(type) {
      // 切换传入子组件的选中评论类型
      this.selectType = type;
    },
    toggleOnlyContent() {
      // 切换是否显示不含内容的评论
      this.onlyContent = !this.onlyContent;
    },
    needShow(type, text) {
      // 此函数根据传入的参数来决定返回何种来操控评价的显示的布尔值

      if (this.onlyContent && !text) {
        // 如果"选择只显示有内容评价"的的选项为真，且当前传入的目标文本为空，就返回false隐藏该项
        return false;
      }
      if (this.selectType === ALL) {
        // 若选择显示全部评论，就直接返回ture
        return true;
      } else {
        // 否则就看评论类型选项选好的值与传入的值是否相同，相同则返回true，显示该项
        return type === this.selectType;
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

    .ratings-wrap {
      margin-top: 16px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-width: 1px 0;
      background-color: #ffffff;

      .title {
        padding: 18px;
        padding-bottom: 0px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        left: 14px;
      }

      .rating-select {
      }

      .rating-list {
        .rating-item {
          position: relative;
          margin: 0 18px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          .user {
            position: absolute;
            top: 16px;
            right: 0;

            .user-name {
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 12px;
              vertical-align: middle;
            }

            .user-avatar {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              margin-left: 6px;
              vertical-align: middle;
            }
          }

          .time {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }

          .text {
            margin-top: 6px;
            font-size: 0;

            .icon {
              font-size: 12px;
              line-height: 24px;
              margin-right: 4px;
              vertical-align: middle;

              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              &.icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }

            .text-content {
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 16px;
              vertical-align: middle;
            }
          }
        }

        .no-rating {
          margin: 0 18px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
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