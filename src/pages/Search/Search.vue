<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form" action="#">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
      />
      <input type="submit" name="submit" class="search_submit" />
    </form>
  </section>
</template>

<script>
import HeaderTop from '@/components/HeaderTop/HeaderTop'
export default {
  components: { HeaderTop }
}
</script>

<style lang="less" scope>
@import '~@/assets/less/mixins.less';
.search {
  width: 100%;
  .search_form {
    .clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 10px 8px;
    input {
      height: 30px;
      padding: 0 6px;
      border-radius: 20px;
      outline: none;
      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 13px;
        color: #666;
        background-color: #f2f2f2;
      }
      &.search_submit {
        float: right;
        width: 18%;
        border: 2px solid @red;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        background-color: @red;
      }
    }
  }
}
</style>
