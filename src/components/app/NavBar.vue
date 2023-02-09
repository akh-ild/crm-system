<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFilter(date) }}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      date: new Date()
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  unmounted () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
    dateFilter (value, format = 'date') {
      value = this.date
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = '2-digit'
        options.year = 'numeric'
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    }
  }
}
</script>
