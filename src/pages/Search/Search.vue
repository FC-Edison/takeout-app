<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form" @submit.prevent="getSearchShops">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
        v-model="keyword"
      />
      <input type="submit" name="submit" class="search_submit" />
    </form>
    <section class="list" v-if="!showNoResult">
      <ul class="list_container">
        <router-link
          :to="{ path: '/shop', query: { id: item.id } }"
          v-for="item in searchShops"
          :key="item.id"
          class="list_li"
        >
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.month_sales || item.recent_order_num }} 单</p>
              <p>
                {{ item.delivery_fee || item.float_minimum_order_amount }}
                元起送 / 距离{{ item.distance }}
              </p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from '@/components/HeaderTop/HeaderTop'
export default {
  components: { HeaderTop },
  data() {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      showNoResult: false
    }
  },
  methods: {
    getSearchShops() {
      if (this.keyword.trim()) {
        this.$store.dispatch('getSearchShops', this.keyword)
      }
    }
  },
  computed: {
    ...mapState(['searchShops'])
  },
  watch: {
    searchShops(value) {
      if (!value.length) {
        this.showNoResult = true
      } else {
        this.showNoResult = false
      }
    }
  }
}
</script>

<style lang="less" scope>
@import '~@/assets/less/mixins.less';
.search {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  .list {
    .list_container {
      background-color: #fff;
      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid rgba(85, 85, 85, 0.3);
        .item_left {
          margin-right: 10px;
          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }
        .item_right {
          font-size: 12px;
          flex: 1;
          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .search_none {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>
