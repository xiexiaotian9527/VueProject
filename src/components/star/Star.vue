<!-- by your name -->
<template>
  <div class='stars'>
    <div class="star" :class="starType">
      <span v-for="item in itemClasses" :key="item" :class="item" class="star-item">
      </span>
    </div>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  name: "stars",

  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },

  data() {
    return {
      
    };
  },

  components: {},

  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      // 处理一下组件获取到的评价分数，将小数位转化为数字'5'
      let score = Math.floor(this.score * 2) / 2;
      //判断评价分数是否有小数
      let hasDecimal = score % 1 !== 0;
      //获取评价分数的整数位
      let integer = Math.floor(score);
      // 根据星星数添加数组内'on'样式个数
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 如果有半星评价，往数组里添加一个'half'样式
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 判断如果数组未填满，剩下元素填入'off'样式
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      //最后记得将处理好的数组返回
      return result;
    }
  },

  methods: {}
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../common/styles/mixin.scss";

// 主要样式
.star {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
}

// 以下对应不同starType
.star-48 {
  .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
    &:last-child {
      margin-right: 0;
    }
  }

  // 以下对应不同item
  .on {
    @include bg-image("images/star48_on");
  }

  .off {
    @include bg-image("images/star48_off");
  }

  .half {
    @include bg-image("images/star48_half");
  }
}

.star-36 {
  .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
    &:last-child {
      margin-right: 0;
    }
  }

  // 以下对应不同item
  .on {
    @include bg-image("images/star36_on");
  }

  .off {
    @include bg-image("images/star36_off");
  }

  .half {
    @include bg-image("images/star36_half");
  }
}

.star-24 {
  .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .on {
    @include bg-image("images/star24_on");
  }
  .off {
    @include bg-image("images/star24_off");
  }
  .half {
    @include bg-image("images/star24_half");
  }
}
</style>