<!-- by your name -->
<template>
  <div class='ratings' ref="ratings">

    <!-- 评论页面内容区开始 -->
    <div class="rating-content">

      <!-- overview总体的简要信息区域 -->
      <div class="overview">
        <!-- 信息左侧 -->
        <div class="overview-left">
          <h1 class="score">{{sellerData.score}}</h1>
          <div class="title">综合评价</div>
          <div class="rankRate">高于周边商家{{sellerData.rankRate}}%</div>
        </div>
        <!-- 信息右侧 -->
        <div class="overview-right">

          <div class="score-wrap">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="sellerData.serviceScore"></star>
            <span class="score">{{sellerData.serviceScore}}</span>
          </div>

          <div class="score-wrap">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="sellerData.foodScore"></star>
            <span class="score">{{sellerData.foodScore}}</span>
          </div>

          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="text">{{sellerData.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <!-- 控制显示评论类型的RatingSelect组件 -->
      <rating-select :ratings="ratingsData" :select-type="selectType" :only-content="onlyContent" :desc="desc" class="rating-select" @selectTypeChange="selectTypeChange" @toggleContent="toggleOnlyContent"></rating-select>

      <div class="ratings-wrap">
        <ul>
          <li class="rating-item" v-for="(rating,index) in ratingsData" :key="index" v-show="needShow(rating.rateType, rating.text)">

            <!-- 左侧头像区 -->
            <div class="avatar">
              <img :src="rating.avatar" class="avatar-img">
            </div>

            <!-- 右侧评论内容区 -->
            <div class="content">

              <!-- 用户名 -->
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrap">

                <!-- 评分星级 -->
                <star class="star" :size="24" :score="rating.score"></star>

                <!-- 送达时间 -->
                <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>

              <!-- 评价内容文本 -->
              <div class="text">{{rating.text}}</div>

              <!-- 推荐内容 -->
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon" :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>
                <span class="recommend-item" v-for="(item, index) in rating.recommend" :key="index">
                  {{item}}
                </span>
              </div>

              <!-- 评论时间 -->
              <div class="rate-time">
                {{rating.rateTime | dateFormat}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 评论页面内容区结束 -->
  </div>
</template>

<script>
// vue插件
import BScroll from "better-scroll";

// 引入处理时间戳的函数
import { formatDate } from "@/common/js/date.js";

// 引入vue模块
import Star from "@/components/star/Star";
import RatingSelect from "@/components/ratingSelect/RatingSelect";

// 分别设置好评，差评和所有评价代表的常量，方便修改传入子组件的数值
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: "ratings",

  props: {
    sellerData: {
      type: Object
    }
  },

  data() {
    return {
      ratingsUrl: "/api/ratings",
      ratingsData: [],

      // 以下是传入RatingSelect组件的数据
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "满意",
        negative: "不满意"
      }
    };
  },

  components: {
    Star,
    RatingSelect
  },

  computed: {},

  methods: {
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
  filters: {
    dateFormat(time) {
      // 格式化时间戳的函数
      // 先将传入的时间戳字符串转换为一个Date对象
      let date = new Date(time);
      // 然后返回 引用外部的处理函数处理过的对象
      return formatDate(date, "yyyy--MM--dd hh:mm");
    }
  },

  created() {
    // 获取评价信息
    this.$axios.get("../data.json").then(
      res => {
        // 将请求成功的数据赋值给本地变量以供调用
        this.ratingsData = res.data.ratings;

        // 再在下个流程页面渲染完成后调用BScroll插件初始化评论列表
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, { click: true });
        });
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.ratings {
  position: absolute;
  top: 184px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #f3f5f7;

  .overview {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background-color: #ffffff;

    .overview-left {
      flex: 0 0 137px;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
      }

      .score {
        margin-bottom: 6px;
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }

      .title {
        margin-bottom: 8px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
      }

      .rankRate {
        margin-bottom: 6px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 12px;
      }
    }

    .overview-right {
      flex: 1;
      padding-left: 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrap {
        margin-bottom: 8px;
        font-size: 12px;

        .title {
          display: inline-block;
          margin-right: 8px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          vertical-align: middle;
        }

        .star {
          display: inline-block;
          margin-right: 12px;
          vertical-align: middle;
        }

        .score {
          display: inline-block;
          color: rgb(255, 153, 0);
          line-height: 18px;
          vertical-align: middle;
        }
      }

      .delivery-time {
        font-size: 12px;
        line-height: 18px;

        .title {
          margin-right: 12px;
          color: rgb(7, 17, 27);
        }

        .text {
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-select {
    margin-top: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    background-color: #ffffff;
  }

  .ratings-wrap {
    background-color: #ffffff;

    .rating-item {
      display: flex;
      margin: 0 18px;
      padding: 18px 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .avatar {
        flex: 0 0 28px;

        .avatar-img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
      }

      .content {
        flex: 1;
        position: relative;
        padding-left: 12px;

        .name {
          font-size: 10px;
          color: rgb(7, 17, 27);
          line-height: 12px;
        }

        .star-wrap {
          margin-top: 4px;
          font-size: 0;

          .star {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
          }

          .delivery-time {
            display: inline-block;
            vertical-align: middle;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
        }

        .text {
          margin-top: 6px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
        }

        .recommend {
          margin-top: 8px;
          font-size: 0;
          line-height: 16px;

          .icon {
            font-size: 12px;

            &.icon-thumb_up {
              color: rgb(0, 160, 220);
            }

            &.icon-thumb_down {
              color: rgb(183, 187, 191);
            }
          }

          .recommend-item {
            margin-left: 8px;
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            font-size: 9px;
            color: rgb(147, 153, 159);
          }
        }

        .rate-time {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 10px;
          font-weight: 200;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }
      }
    }
  }
}
</style>