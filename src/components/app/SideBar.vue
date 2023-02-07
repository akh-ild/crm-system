<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link v-for="link in links" :key="link.url" :to="link.url" v-slot="{ href, isActive, isExactActive }">
      <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
        <a :href="href">{{ link.title }}</a>
      </li>
    </router-link>
    </ul>
</template>

<script>

export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      {
        title: 'Счет',
        url: '/'
      },
      {
        title: 'История',
        url: '/history'
      },
      {
        title: 'Планирование',
        url: '/planning'
      },
      {
        title: 'Новая запись',
        url: '/record'
      },
      {
        title: 'Категории',
        url: '/categories'
      }
    ]
  })
}
</script>
