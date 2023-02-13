<template>
  <div class="app-main-layout">
    <Navbar @toggle="onClick" />
    <Sidebar :is-open="isOpen" />
    <main :class="{full: !isOpen}" class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/NavBar'
import Sidebar from '@/components/app/SideBar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  },
  data () {
    return {
      isOpen: true
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Something wrong')
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  methods: {
    onClick () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
