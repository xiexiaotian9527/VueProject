<!-- by your name -->
<template>
  <div class='seller' ref="seller">
    <div class="seller-content">
      <!-- 店铺主要信息区域 -->
      <div class="overview">
        <!-- 店铺名 -->
        <h1 class="seller-title">{{sellerData.name}}</h1>

        <!-- 店铺信息 -->
        <div class="seller-desc">
          <star class="star" :size="36" :score="sellerData.score"></star>
          <span class="rating-count">
            ({{sellerData.ratingCount}})
          </span>
          <span class="sell-count">
            月售{{sellerData.sellCount}}单
          </span>
        </div>

        <!-- 配送信息 -->
        <ul class="delivery-desc">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{sellerData.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{sellerData.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{sellerData.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>

        <!-- 收藏按钮 -->
        <div class="favorite" @click="toggleFavorite">
          <div class="icon" :class="{'is-favorite': isFavorite}">
            <span class="icon-favorite"></span>
          </div>
          <div class="text">{{favoriteText}}</div>
        </div>
      </div>

      <!-- 商家公告区域 -->
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content">{{sellerData.bulletin}}</div>
        <!-- 支持的活动列表 -->
        <ul class="supports-list">
          <li v-if="sellerData.supports" v-for="(item, index) in sellerData.supports" :key="index" class="supports-item">
            <span :class="classMap[item.type]" class="icon"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>

      <!-- 商家实景区域 -->
      <div class="seller-pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrap" ref="picsWrap">
          <ul class="pic-list" ref="picsList">
            <li class="pic-item" v-for="(pic, index) in sellerData.pics" :key="index">
              <img class="pic-img" :src="pic">
            </li>
          </ul>
        </div>
      </div>

      <!-- 商家信息区域 -->
      <div class="seller-infos">
        <h1 class="title">商家信息</h1>
        <ul class="infos-wrap">
          <li class="info-item" v-for="(item, index) in sellerData.infos" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// vue插件
import BScroll from "better-scroll";

// 自定义的工具函数
import { urlParse } from "@/common/js/util.js";
import { saveToLocal, loadFromLocal } from "@/common/js/store.js";

// 引入vue模块
import Star from "@/components/star/Star";

export default {
  name: "seller",

  props: {
    sellerData: {
      type: Object
    }
  },

  data() {
    return {
      isFavorite: (() => {
        //  用自定义工具函数向localStorage中读取属性，如果无此属性，则函数返回一个传入的默认值
        return loadFromLocal(this.sellerData.id, "favorite", false);
      })()
    };
  },

  filters: {},

  components: {
    BScroll,
    Star
  },

  computed: {
    favoriteText() {
      return this.isFavorite ? "已收藏" : "收藏";
    }
  },

  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, { click: true });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics() {
      // 如果传回的数据中有图片就继续执行
      if (this.sellerData.pics) {
        // 先将图片列表的ul宽度设定成和图片列表的宽度总和一样宽
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.sellerData.pics.length - margin;
        this.$refs.picsList.style.width = width + "px";
        // 接下来再调用better-scroll插件初始化图片列表的横向滚动效果
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picsWrap, {
              scrollX: true,
              eventPassthrough: "vertical"
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite() {
      // 切换店铺收藏效果(如果是线上，可以利用此效果发送ajax请求告诉服务器此店铺是否收藏)
      this.isFavorite = !this.isFavorite;
      // 用自定义工具函数向localStorage中添加属性
      saveToLocal(this.sellerData.id, "favorite", this.isFavorite);
    }
  },

  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },

  mounted() {
    // 在页面DOM完全创建且嵌入页面 完毕后使用插件初始化页面的滚动效果
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../common/styles/mixin.scss";

.seller {
  position: absolute;
  top: 184px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #f3f5f7;

  .seller-content {
    .overview {
      position: relative;
      padding: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background-color: #ffffff;

      .seller-title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .seller-desc {
        padding: 8px 0 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;

        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
        }

        .rating-count {
          margin-right: 12px;
          vertical-align: middle;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
        }

        .sell-count {
          vertical-align: middle;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
        }
      }

      .delivery-desc {
        display: flex;
        margin-top: 18px;

        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }

          h2 {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }

          .content {
            margin-top: 4px;
            font-size: 10px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            line-height: 24px;

            .stress {
              font-size: 24px;
            }
          }
        }
      }

      .favorite {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 36px;
        text-align: center;

        .icon {
          font-size: 24px;
          color: #d4d6d9;
          line-height: 24px;

          &.is-favorite {
            color: #f01313;
          }
        }

        .text {
          margin-top: 4px;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 10px;
        }
      }
    }

    .bulletin {
      margin-top: 16px;
      padding: 18px 18px 0 18px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-width: 1px 0;
      background-color: #ffffff;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .content {
        margin-top: 8px;
        padding: 0 12px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }

      .supports-list {
        margin-top: 16px;

        .supports-item {
          padding: 16px 12px;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 0;

          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 100%;
            vertical-align: middle;

            &.decrease {
              @include bg-image("images/decrease_4");
            }
            &.discount {
              @include bg-image("images/decrease_4");
            }
            &.guarantee {
              @include bg-image("images/guarantee_4");
            }
            &.invoice {
              @include bg-image("images/invoice_4");
            }
            &.special {
              @include bg-image("images/special_4");
            }
          }

          .text {
            font-size: 12px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            line-height: 16px;
            vertical-align: middle;
          }
        }
      }
    }

    .seller-pics {
      margin-top: 16px;
      padding: 18px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-width: 1px 0;
      background-color: #ffffff;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .pics-wrap {
        margin-top: 12px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .pic-list {
          font-size: 0;

          .pic-item {
            display: inline-block;
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }

            .pic-img {
              width: 120px;
              height: 90px;
            }
          }
        }
      }
    }

    .seller-infos {
      margin-top: 16px;
      padding: 18px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-width: 1px 0;
      background-color: #ffffff;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .infos-wrap {
        margin-top: 12px;

        .info-item {
          padding: 16px 12px;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 16px;
        }
      }
    }
  }
}
</style>