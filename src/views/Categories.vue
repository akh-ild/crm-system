<template>
  <div>
    <div class="page-title">
      <h3>{{ $locale('categories') }}</h3>
    </div>
    <section>
      <Loader v-if="isLoading" />
      <div v-else class="row">
        <CategoryCreate @create="refreshCategories" />
        <CategoryEdit v-if="categories.length" :categories="categories" @update="refreshCategories" />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Category/CategoryCreate'
import CategoryEdit from '@/components/Category/CategoryEdit'
import Loader from '@/components/app/Loader.vue'

export default {
  name: 'categories',
  components: {
    CategoryCreate, CategoryEdit, Loader
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    categories () {
      return this.$store.getters.categories
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchCategories')
  },
  methods: {
    async refreshCategories () {
      await this.$store.dispatch('fetchCategories')
    }
  }
}
</script>
