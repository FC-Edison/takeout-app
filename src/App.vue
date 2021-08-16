<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from '@/components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  components: { FooterGuide },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  mounted() {
    this.getAddress()
    this.getUserInfo()
  }
}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
