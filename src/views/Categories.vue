<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @create="addCategory" />
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Category/CategoryCreate'
import CategoryEdit from '@/components/Category/CategoryEdit'

export default {
  name: 'categories',
  components: {
    CategoryCreate, CategoryEdit
  },
  data () {
    return {
      categories: []
    }
  },
  methods: {
    addCategory (category) {
      this.categories.push(category)
    }
  }
}
</script>
