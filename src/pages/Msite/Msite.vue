<template>
  <section class="msite">
    <HeaderTop :title="address.name">
      <router-link class="header_search" to="/search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link
        class="header_login"
        slot="right"
        :to="userInfo._id ? '/userinfo' : '/login'"
      >
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-wode1"></i>
        </span>
      </router-link>
    </HeaderTop>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(category, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(e, index) in category"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageUrl + e.image_url" />
              </div>
              <span>{{ e.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <ShopList />
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { mapState } from 'vuex'

import HeaderTop from '@/components/HeaderTop/HeaderTop'
import ShopList from '@/components/ShopList/ShopList'
export default {
  components: { HeaderTop, ShopList },
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address', 'categories', 'userInfo']),
    categorysArr() {
      const { categories } = this
      let arr = []
      let innerArr = []
      categories.forEach(e => {
        if (innerArr.length >= 8) innerArr = []
        if (!innerArr.length) arr.push(innerArr)
        innerArr.push(e)
      })
      return arr
    }
  },
  watch: {
    categories() {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  mounted() {
    this.$store.dispatch('getFoodCategories')
    this.$store.dispatch('getShops')
  }
}
</script>

<style lang="less" scope>
@import '~@/assets/less/mixins.less';
.msite {
  width: 100%;
  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;
    .icon-sousuo {
      font-size: 22px;
      color: #fff;
    }
  }
  .header_login {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    .header_login_text {
      font-size: 14px;
      color: #fff;
      .iconfont {
        font-size: 26px;
        font-weight: 400;
      }
    }
  }
  .msite_nav {
    .bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background-color: #fff;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          .link_to_food {
            width: 25%;
            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;
              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }
            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }
      .swiper-pagination-bullet-active {
        background-color: rgb(253, 37, 127);
      }
    }
  }
}
</style>
