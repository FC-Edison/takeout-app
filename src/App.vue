<template>
  <div id="app">
    <router-view />
    <FooterGuide />
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  components: { FooterGuide }
}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
