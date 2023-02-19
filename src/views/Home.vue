<template>
  <div>
    <div class="page-title">
      <h3>{{ $locale('bill') }}</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="isLoading" />
    <div v-else class="row">
      <HomeBill :currency="currency" />
      <HomeCurrency :currency="currency" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/Home/HomeBill.vue'
import HomeCurrency from '@/components/Home/HomeCurrency.vue'
import Loader from '@/components/app/Loader.vue'

export default {
  name: 'home',
  components: {
    HomeBill, HomeCurrency, Loader
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    currency () {
      return this.$store.getters.currency
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchCurrency')
  },
  methods: {
    async refresh () {
      await this.$store.dispatch('fetchCurrency')
    }
  }
}
</script>
