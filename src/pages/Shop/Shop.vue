<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import ShopHeader from '@/components/ShopHeader/ShopHeader'
export default {
  components: {
    ShopHeader
  },
  mounted() {
    this.$store.dispatch('getShopInfo')
  }
}
</script>

<style lang="less" scope>
@import '~@/assets/less/mixins.less';
.tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
  .bottom-border-1px(rgba(7, 17, 27, 0.1));
  .tab-item {
    float: left;
    width: 33.3333333%;
    text-align: center;
    font-size: 14px;
    a {
      display: block;
      position: relative;
      color: rgb(77, 85, 93);
      &.router-link-active {
        color: #02a774;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 35%;
          height: 2px;
          transform: translateX(-50%);
          background: #02a774;
        }
      }
    }
  }
}
</style>
