<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{ title }}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: rgb(221, 14, 14);
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    text-align: center;
    .header_title_text {
      font-size: 18px;
      color: #fff;
      // 通过块元素设置宽度来实现多余文字省略号
      display: block;
    }
  }
}
</style>
