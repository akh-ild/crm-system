<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link v-for="link in links" :key="link.url + lang" :to="link.url" v-slot="{ href, isActive, isExactActive }">
      <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
        <a :href="href">{{ link.title }}</a>
      </li>
    </router-link>
    </ul>
</template>

<script>

export default {
  name: 'side-bar',
  props: ['isOpen'],
  computed: {
    lang () {
      return this.$store.getters.info.lang
    },
    links () {
      return [
        {
          title: this.$locale('bill'),
          url: '/'
        },
        {
          title: this.$locale('history'),
          url: '/history'
        },
        {
          title: this.$locale('planning'),
          url: '/planning'
        },
        {
          title: this.$locale('new-record'),
          url: '/record'
        },
        {
          title: this.$locale('categories'),
          url: '/categories'
        }
      ]
    }
  }
}
</script>
