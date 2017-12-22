<!-- by your name -->
<!-- 需要传入想要的图片尺寸以及图片类型序号即可 -->
<!-- 如"<my-icon v-if="item.type >= 0" width="12px" height="12px" :type="item.type"></my-icon> -->
<template>
  <div class='icon'>
    <div
     class="icon"
      :class="classMap[type]"
      :style="{'width': width, 'height': height, 'background-size': size}">

    </div>
  </div>
</template>

<script>
export default {
  name: "icon",

  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    size: {
      type: String
    },
    type: {
      type: Number
    }
  },

  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {},

  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../common/styles/mixin.scss";

.icon {
  display: inline-block;
}

.decrease {
  @include bg-image("images/decrease_3");
}
.discount {
  @include bg-image("images/decrease_3");
}
.guarantee {
  @include bg-image("images/guarantee_3");
}
.invoice {
  @include bg-image("images/invoice_3");
}
.special {
  @include bg-image("images/special_3");
}
</style>