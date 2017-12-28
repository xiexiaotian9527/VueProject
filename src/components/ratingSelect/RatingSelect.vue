<!-- 
    1.这个模块可以传入评价列表，以显示总评数，好评和差评数，还可以传入自己想要的评价类型的描述；
    2.这个模块还能传递两个事件，以便父组件切换选定的评价类型，以及切换是否只查看有内容评价的选项
 -->
<template>
    <div class='rating-select'>
        <!-- 评价类型选择项 -->
        <div class="rating-type">
            <span class="block positive" :class="{'active': selectType===2}" @click="select(2)">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{'active': selectType===0}" @click="select(0)">
                {{desc.positive}}
                <span class="count">{{positive.length}}</span>
            </span>
            <span class="block negative" :class="{'active': selectType===1}" @click="select(1)">
                {{desc.negative}}
                <span class="count">{{negative.length}}</span>
            </span>
        </div>

        <!-- 显示评价内容的切换选项 -->
        <div class="switch" :class="{'on': onlyContent}" @click="toggleContent">
            <span class="icon icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
// 分别设置好评，差评和所有评价代表的常量，以便组件内部调用及修改
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: "rating-select",

  props: {
    ratings: {
      // 设置从父组件接收的全部评价，以数组表示
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      // 设置从父组件接收的默认显示评价类型，默认是全部评价
      type: Number,
      default: ALL
    },
    onlyContent: {
      // 设置是否只看有内容的评价，默认否
      type: Boolean,
      default: false
    },
    desc: {
      // 设置父组件传入的组件默认按钮描述内容
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },

  data() {
    return {};
  },

  components: {},

  computed: {
    positive() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negative() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },

  methods: {
    select(type) {
      // 向父组件传递改变选中评论类型的事件
      this.$emit("selectTypeChange", type);
    },
    toggleContent() {
      // 向父组件传递是否显示不含内容的评论的事件
      this.$emit("toggleContent");
    }
  },

  created() {}
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.rating-select {
  .rating-type {
    margin: 0 18px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .block {
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 2px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(77, 85, 93);

      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
          color: #ffffff;
        }
      }

      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
          color: #ffffff;
        }
      }

      .count {
        display: inline-block;
        margin-left: 2px;
        transform: scale(0.8);
      }
    }
  }

  .switch {
    padding: 12px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    line-height: 24px;
    font-size: 0;
    &.on {
      .icon {
        color: #00c850;
      }
    }

    .icon {
      margin-right: 4px;
      font-size: 24px;
      vertical-align: middle;
    }

    .text {
      font-size: 12px;
      vertical-align: middle;
    }
  }
}
</style>