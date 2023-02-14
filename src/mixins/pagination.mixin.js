import _ from 'lodash'

export default {
  data () {
    return {
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  computed: {
    page () {
      return +this.$route.query.page || 1
    }
  },
  methods: {
    setupPagination (allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    onPageChange (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}
