<!-- by your name -->
<template>
  <div class='header'>
    <!-- 主体内容区开始 -->
    <div class="content-wrap">
      <!-- avatar开始 -->
      <div class="avatar">
        <img :src="sellerData.avatar">
      </div>
      <!-- avatar结束 -->

      <!-- content开始 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerData.name}}</span>
        </div>

        <div class="description">
          {{sellerData.description}}/{{sellerData.deliveryTime}}分钟送达
        </div>

        <div class="supports" v-if="sellerData.supports">
          <div class="icon" :class="classMap[sellerData.supports[0].type]"></div>
          <div class="text">{{sellerData.supports[0].description}}</div>
        </div>

        <div class="supports-count" @click="showDetail">
          <span v-if="sellerData.supports" class="count">
            {{sellerData.supports.length}}个
          </span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <!-- content结束 -->
      div
    </div>
    <!-- 主题内容区结束 -->

    <!-- 公告区开始 -->
    <div class="bulletin-wrap" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{sellerData.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 公告区结束 -->

    <!-- 头部背景图区域开始 -->
    <div class="header-bg">
      <img :src="sellerData.avatar">
    </div>
    <!-- 头部背景图区域结束 -->

    <!-- 详情页遮罩层开始 -->
    <transition name="detail-show">
      <div class="detail" v-show="detailShow">
        <!-- detail主要内容开始 -->
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <!-- 店铺名 -->
            <h1 class="name">{{sellerData.name}}</h1>
            <!-- 评价 -->
            <div class="star-wrap">
              <star :size="48" :score="sellerData.score"></star>
            </div>
            <!-- 优惠信息 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports-list">
              <li v-if="sellerData.supports" v-for="(item, index) in sellerData.supports" :key="index" class="supports-item">
                <span :class="classMap[item.type]" class="icon"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <!-- 商家公告 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{sellerData.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- detail主要内容结束 -->

        <!-- 关闭detail的图标开始 -->
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
        <!-- 关闭detail的图标结束 -->
      </div>
    </transition>
    <!-- 详情页遮罩层结束 -->
  </div>
</template>

<script>
import Star from "@/components/star/Star";

export default {
  name: "header",

  props: {
    sellerData: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      detailShow: false
    };
  },

  components: {
    Star
  },

  computed: {},

  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },

  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../common/styles/mixin.scss";

.header {
  position: relative;
  color: #ffffff;
  background-color: rgba(7, 17, 27, 0.5);
  font-weight: 200;
  overflow: hidden;

  .content-wrap {
    position: relative;
    padding: 24px 16px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;

      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      margin-left: 16px;
      vertical-align: top;

      .title {
        margin-top: 2px;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: middle;
          @include bg-image("images/brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          vertical-align: middle;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-top: 10px;
        font-size: 12px;
        line-height: 17px;
      }

      .supports {
        margin-top: 10px;
        font-size: 10px;

        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: 10px;
          line-height: 17px;
        }

        .decrease {
          @include bg-image("images/decrease_1");
        }
        .discount {
          @include bg-image("images/decrease_1");
        }
        .guarantee {
          @include bg-image("images/guarantee_1");
        }
        .invoice {
          @include bg-image("images/invoice_1");
        }
        .special {
          @include bg-image("images/special_1");
        }
      }

      .supports-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        height: 24px;
        border-radius: 14px;
        padding: 0px 8px;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 10px;
        line-height: 24px;

        .counter {
        }
        i {
          line-height: 24px;
        }
      }
    }
  }

  .bulletin-wrap {
    position: relative;
    height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .bulletin-icon {
      display: inline-block;
      height: 12px;
      width: 22px;
      vertical-align: middle;
      @include bg-image("images/bulletin");
      background-repeat: no-repeat;
      background-size: 22px 12px;
    }

    .bulletin-text {
      font-size: 10px;
    }

    i {
      position: absolute;
      right: 12px;
      top: 8px;
      font-size: 10px;
    }
  }

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    filter: blur(10px);

    img {
      width: 100%;
    }
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 10%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);

    .detail-wrap {
      min-height: 100%;
      width: 80%;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;

        .name {
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
          text-align: center;
        }

        .star-wrap {
          margin-top: 16px;
          text-align: center;
        }

        .title {
          display: flex;
          width: 100%;
          margin: 28px auto 0 auto;

          .line {
            flex: 1;
            position: relative;
            top: -7px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 7px;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
          }
        }

        .supports-list {
          margin-top: 24px;
          padding: 0 12px;

          .supports-item {
            padding-bottom: 12px;
            font-size: 0;
            &:last-child {
              padding-bottom: 0;
            }

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: middle;
              margin-right: 6px;
              background-repeat: no-repeat;
              background-size: 16px 16px;
            }

            .text {
              vertical-align: middle;
              font-size: 12px;
              line-height: 12px;
            }

            .decrease {
              @include bg-image("images/decrease_1");
            }
            .discount {
              @include bg-image("images/decrease_1");
            }
            .guarantee {
              @include bg-image("images/guarantee_1");
            }
            .invoice {
              @include bg-image("images/invoice_1");
            }
            .special {
              @include bg-image("images/special_1");
            }
          }
        }

        .bulletin {
          margin-top: 24px;
          padding: 0 12px;

          .content {
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }

    .detail-close {
      position: relative;
      width: 100%;
      margin: -64px auto 0 auto;
      clear: both;

      i {
        position: relative;
        display: block;
        width: 32px;
        height: 32px;
        margin: 0 auto;
        left: -32px;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  // 定义detail显示隐藏时的过渡效果
  .detail-show-enter-active,
  .detail-show-leave-active {
    transition: all 0.3s ease;
  }
  .detail-show-enter,
  .detail-show-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
