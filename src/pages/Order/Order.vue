<template>
  <section class="order">
    <HeaderTop title="订单列表" />
    <section class="order_no_login">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <router-link to="/login" class="router">
        <button>
          立即登陆
        </button>
      </router-link>
    </section>
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
.order {
  width: 100%;
  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    > img {
      display: block;
      width: 100%;
      height: 30;
    }
    > h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }
    .router {
      > button {
        display: inline-block;
        background: @red;
        font-size: 14px;
        color: #fff;
        border: 0;
        outline: none;
        border-radius: 6px;
        padding: 5px 14px;
      }
    }
  }
}
</style>
