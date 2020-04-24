<template>
  <div>
    <v-pagination
      v-if="pagination"
      v-model="page"
      :length="Math.round(items.length / 5.0)"
      class="my-2"/>
    <list-group>
      <template v-for="item in feedItems">
        <a
          :key="item.link + 'img'"
          :href="item.link"
          target="_blank">
          <v-img
            v-if="item.enclosure !== undefined"
            v-ripple
            :src="item.enclosure.url"
            :alt="item.title"
            :aspect-ratio="16/9"/>
        </a>
        <card
          :key="item.link + 'card'"
          :top="item.enclosure === undefined"
          :href="item.link"
          target="_blank">
          <template #title>{{ item.title }} - {{ dateToText(item.pubDate) }}</template>
          <template #description>
            <span v-html="item.content"/>
          </template>
        </card>
      </template>
    </list-group>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    feedItems () {
      return this.pagination ? this.items.slice((this.page - 1) * 5, (this.page - 1) * 5 + 5) : this.items
    }
  }
}
</script>