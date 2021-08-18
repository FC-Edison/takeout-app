<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-minus-circle-fill"
        v-if="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <!-- <div class="cart-count" v-if="food.count">{{ food.count }}</div> -->
    <input
      class="cart-count"
      v-if="food.count || isShowInput"
      @focus="isShowInput = true"
      @blur="isShowInput = false"
      v-model.number.trim="food.count"
      @input.prevent="inputCount($event, food)"
      ref="inputCount"
    />
    <div
      class="iconfont icon-jiahao1"
      @click.stop="updateFoodCount(true)"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return { isShowInput: false }
  },
  props: {
    food: Object
  },
  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    },
    inputCount($event, food) {
      // console.log(11)
      const count = $event.target.value
      this.$store.dispatch('inputFoodCount', { food, count })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/mixins.less';
.cartcontrol {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  // float: right;
  width: 100px;
  height: 20px;
  .icon-minus-circle-fill {
    display: inline-block;
    padding: 6px;
    line-height: 20px;
    font-size: 20px;
    color: #666;
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.3s;
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translateX(20px) rotate(40deg);
      // transform-origin: 20px 20px;
    }
  }
  .cart-count {
    display: inline-block;
    text-align: center;
    color: rgb(147, 153, 159);
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 14px;
    height: 18px;
    line-height: 18px;
    font-size: 10px;
    margin-top: 4px;
    caret-color: rgb(219, 92, 92);
  }
  .icon-jiahao1 {
    display: inline-block;
    padding: 6px;
    line-height: 20px;
    font-size: 20px;
    color: @red;
  }
}
</style>
