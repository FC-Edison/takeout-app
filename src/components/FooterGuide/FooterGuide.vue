<template>
  <footer class="footer_guide">
    <router-link to="/msite" replace class="guide_item" :class="{on:'/msite'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link to="/search" replace class="guide_item" :class="{on:'/search'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link to="/order" replace class="guide_item" :class="{on:'/order'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-order_icon"></i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link to="/profile" replace class="guide_item" :class="{on:'/profile'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </router-link>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '~@/assets/less/mixins.less';
a{
  text-decoration: none;
}
.footer_guide {
  .top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 50px;
  display: flex;
  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999;
    &.on {
      color: #414141;
    }
    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;
      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>
