<template>
  <v-content>
    <v-dialog
      v-model="profileDialog"
      max-width="50%">
      <profile @close="profileDialog = false"/>
    </v-dialog>
    <app-bar :title="$t('pages.home')">
      <template #top-bar-actions>
        <div class="hidden-md-and-up">
          <v-bottom-sheet
            v-model="profileSheet"
            scrollable
            inset>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-tooltip
                  open-delay="500"
                  bottom>
                  <template #activator="{ on }">
                    <v-btn
                      color="secondary"
                      elevation="0"
                      fab
                      small
                      v-on="on">
                      <v-icon>mdi-account-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('pages.profile') }}</span>
                </v-tooltip>
              </div>
            </template>
            <profile @close="profileSheet = false"/>
          </v-bottom-sheet>
        </div>
        <div class="hidden-sm-and-down">
          <v-btn
            color="secondary"
            elevation="0"
            fab
            small
            @click="profileDialog = true">
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </app-bar>
    <v-container>
      <v-row wrap>
        <v-col
          cols="12"
          md="3">
          <v-card
            elevation="0"
            tile>
            <v-card-text>
              <div>{{ $t('home.appSubtitle') }}</div>
              <img
                width="50%"
                src="/img/logo-large.png"
                alt="Highest logo">
              <div class="text--primary">{{ $t('home.appDescription') }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="9">
          <v-row>
            <v-col cols="12">
              <template v-if="feedLoader">
                <v-progress-linear
                  indeterminate
                  color="primary"/>
              </template>
              <template v-else>
                <div
                  v-for="feed in feeds"
                  :key="feed.title">
                  <v-row>
                    <h2>{{ feed.title }}</h2>
                    <v-btn
                      :href="feed.link"
                      target="_blank"
                      icon>
                      <v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-row>
                  <p class="mb-0">{{ feed.description }}</p>
                  <v-pagination
                    v-model="feed.page"
                    :length="Math.round(feed.items.length / 5.0)"
                    class="my-2"/>
                  <list>
                    <card
                      v-for="item in feed.items.slice((feed.page - 1) * 5, (feed.page - 1) * 5 + 5)"
                      :key="item.link"
                      top
                      :href="item.link"
                      target="_blank">
                      <template #title>{{ item.title }} - {{ dateToText(item.pubDate) }}</template>
                      <template #description>
                        <span v-html="item.content"/>
                      </template>
                    </card>
                  </list>
                </div>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import { dateToText } from '@/utils/parsing'
import { getFeeds } from '@/utils/feeds'
import Profile from './parts/Profile.vue'

export default {
  name: 'Home',
  components: { Profile },
  data () {
    return {
      feeds: [],
      feedLoader: true,

      profileSheet: false,
      profileDialog: false
    }
  },
  mounted () {
    getFeeds(this, this.getFeeds)
  },
  computed: {
    ...mapGetters(['getFeeds'])
  },
  methods: {
    dateToText
  }
}
</script>
