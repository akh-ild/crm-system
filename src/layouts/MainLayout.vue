<template>
  <div class="app-main-layout">
    <div style="color:#000;z-index:1000">
      {{isOpen}}
    </div>
    <Navbar @toggle="onClick" />

    <Sidebar :is-open="isOpen" />

    <main :class="{full: !isOpen}" class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/NavBar'
import Sidebar from '@/components/app/SideBar'

export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  },
  data: () => ({
    isOpen: true
  }),
  methods: {
    onClick () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
