<template>
  <ul class="sidenav app-sidenav open">
    <li v-for="link in links" :key="link.url">
      <router-link active-class="active" :to="link.url" :exact="link.exact">
        {{link.title}}
      </router-link>
    </li>
    </ul>
</template>

<script>

export default {
  data: () => ({
    links: [
      {
        title: 'Счет',
        url: '/',
        exact: true
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
