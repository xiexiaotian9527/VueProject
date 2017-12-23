<!-- by your name -->
<template>
  <div class='goods'>
    <!-- 左侧菜单栏开始 -->
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="(item, index) in goodsData" :key="index" :class="{'current': currentIndex == index}" class="menu-item" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <my-icon v-show="item.type >= 0" width="12px" height="12px" size="12px 12px" :type="item.type" class="icon"></my-icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 左侧菜单栏结束 -->

    <!-- 右侧商品内容区开始 -->
    <div class="foods-wrap" ref="foodsWrap">
      <!-- 遍历菜品分类 -->
      <ul>
        <li v-for="(item, index) in goodsData" :key="index" class="foods-list" ref="foodList">
          <h1 class="foods-title">
            <p>{{item.name}}</p>
          </h1>
          <!-- 再遍历各个菜品类里的菜品 -->
          <ul>
            <li v-for="(food, num) in item.foods" :key="num" class="food-item border-1px">
              <!-- 左侧菜品图标 -->
              <div class="food-icon">
                <img :src="food.icon" :alt="food.name">
              </div>
              <!-- 右侧菜品各种信息 -->
              <div class="food-content">
                <h2 class="food-name">
                  {{food.name}}
                </h2>
                <p class="food-desc">
                  {{food.description}}
                </p>
                <div class="food-extra">
                  <span class="sell-count">
                    月售{{food.sellCount}}份
                  </span>
                  <span class="rating">
                    好评率{{food.rating}}%
                  </span>
                </div>
                <div class="food-price">
                  <span class="now-price">
                    <i>￥</i>{{food.price}}
                  </span>
                  <span class="old-price" v-if="food.oldPrice">
                    <i>￥</i>{{food.oldPrice}}
                  </span>
                </div>

                <div class="food-control">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 右侧商品内容区结束 -->

    <!-- 购物车组件开始 -->
    <shop-cart :select-foods="selectFoods" :delivery-price="sellerData.deliveryPrice" :min-price="sellerData.minPrice"></shop-cart>
    <!-- 购物车组件结束 -->
  </div>
</template>

<script>
import BScroll from "better-scroll";

import MyIcon from "@/components/icon/Icon";
import ShopCart from "@/components/shopCart/ShopCart";
import CartControl from "@/components/cartControl/CartControl";

export default {
  name: "goods",

  props: {
    sellerData: {
      type: Object
    }
  },

  data() {
    return {
      goodsData: [],
      listHeigt: [],
      scrollY: 0
    };
  },

  components: {
    MyIcon,
    ShopCart,
    CartControl
  },

  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeigt.length; i++) {
        let height1 = this.listHeigt[i];
        let height2 = this.listHeigt[i + 1];

        // 返回当前位置相对于总内容的位置索引值
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      if (this.goodsData.length) {
        this.goodsData.forEach(good => {
          good.foods.forEach(food => {
            foods.push(food);
          });
        });
      }

      // console.log('forEach' in this.goodsData);
      return foods;
    }
  },

  methods: {
    _initScroll() {
      // 初始化需要滚动的元素
      this.menuScroll = new BScroll(this.$refs.menuWrap, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
        probeType: 3,
        click: true
      });

      // 绑定scroll事件，实时获取滚动的内容的距离
      this.foodsScroll.on("scroll", pro => {
        this.scrollY = Math.abs(Math.round(pro.y));
      });
    },
    _calculateHeight() {
      // 获取food各个类别的元素
      var foodList = this.$refs.foodList;

      // 将初始高度推入预定好的空数组里
      var height = 0;
      this.listHeigt.push(height);

      // 遍历food类别元素的高度，依次计算出距父元素顶部的scrollTop距离，并推入数组
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.listHeigt.push(height);
      }
    },
    selectMenu(index, event) {
      // 检测是否是浏览器原生的点击事件，如果是则不执行此次事件
      if (!event._constructed) {
        return;
      }
      // 获取foods各个类别的元素
      let foodList = this.$refs.foodList;
      // 获取当前点击的左侧菜单对应的foods类别
      let el = foodList[index];
      // 调用对应better-scroll实例对象的api完成内容滑动
      this.foodsScroll.scrollToElement(el, 100);
    }
  },

  created: function() {
    this.$axios.get("/api/goods").then(
      res => {
        this.goodsData = res.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      },
      err => {
        console.log(err);
      }
    );
    // console.log(this.sellerData);
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../common/styles/mixin.scss";

.goods {
  display: flex;
  position: absolute;
  top: 184px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;

  .menu-wrap {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;

    .menu-item {
      display: table;
      position: relative;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      font-size: 12px;
      line-height: 14px;
      &.current {
        margin-top: -1px;
        background-color: #fff;
        font-weight: 700;
        z-index: 10;

        .text {
          @include border-none();
        }
      }

      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));

        .icon {
          vertical-align: middle;
        }
      }
    }
  }

  .foods-wrap {
    flex: 1;

    .foods-list {
      .foods-title {
        width: 100%;
        height: 26px;
        border-left: 1px solid #d9dde1;
        background-color: #f3f5f7;
        color: rgb(147, 153, 159);
        font-size: 12px;
        line-height: 26px;

        p {
          margin-left: 14px;
        }
      }
      .food-item {
        position: relative;
        display: flex;
        margin: 18px 18px 0 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none();
        }

        .food-icon {
          flex: 0 0 57px;

          img {
            height: 57px;
            width: 57px;
          }
        }

        .food-content {
          flex: 1;
          margin-left: 10px;

          .food-name {
            margin-top: 2px;
            color: rgb(7, 17, 27);
            font-size: 14px;
            line-height: 14px;
          }

          .food-desc,
          .food-extra {
            margin-top: 8px;
            color: rgb(147, 153, 159);
            font-size: 10px;
            line-height: 12px;
          }

          .food-extra {
            line-height: 10px;

            .sell-count {
              margin-right: 12px;
            }
          }

          .food-price {
            // font-size: 0;
            .now-price {
              margin-right: 8px;
              color: rgb(240, 20, 20);
              font-size: 14px;
              line-height: 24px;
              font-weight: 700;

              i {
                font-size: 10px;
                font-weight: normal;
              }
            }

            .old-price {
              color: rgb(147, 153, 159);
              font-size: 10px;
              line-height: 24px;
              font-weight: 700;
              text-decoration: line-through;

              i {
                font-weight: normal;
              }
            }
          }

          .food-control {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
