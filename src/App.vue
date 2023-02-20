<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content}` : `SITE_NAME` }}</template>
  </metainfo>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  setup () {
    useMeta({
      title: ''
    })
  },
  components: {
    EmptyLayout, MainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import 'assets/index.css';
</style>
