<template>
  <v-content>
    <app-bar :title="$t('pages.home')">
      <template #top-bar-actions>
        <profile/>
      </template>
    </app-bar>
    <v-container>
      <v-row wrap>
        <v-col
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12">
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
            <v-col cols="12">
              <v-alert
                type="warning"
                icon="mdi-alert-outline"
                outlined
                text
                v-html="$t('settings.betaNotice')"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12">
              <v-switch
                v-model="separatedFeeds"
                :label="$t('home.separatedFeeds')"
                inset/>
              <v-progress-linear
                v-if="!feedsLoaded"
                class="mb-4"
                indeterminate/>
              <template v-if="separatedFeeds">
                <div
                  v-for="feed in feeds"
                  :key="feed.title">
                  <v-row>
                    <h2 class="ml-3">{{ feed.title }}</h2>
                    <v-tooltip
                      open-delay="500"
                      bottom>
                      <template #activator="{ on }">
                        <v-btn
                          :href="feed.link"
                          target="_blank"
                          icon
                          v-on="on">
                          <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('home.visitWebsite') }}</span>
                    </v-tooltip>
                    <v-tooltip
                      open-delay="500"
                      bottom>
                      <template #activator="{ on }">
                        <v-btn
                          icon
                          color="error"
                          v-on="on"
                          @click="feedDelete(feed.feedUrl)">
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('home.deleteFeed') }}</span>
                    </v-tooltip>
                  </v-row>
                  <p class="mb-0">{{ feed.description }}</p>
                  <feeds-list
                    :items="feed.items"
                    :page="feed.page"
                    pagination/>
                </div>
              </template>
              <template v-else>
                <feeds-list :items="feedItems"/>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getFeeds } from '@/utils/feeds'
import FeedsList from '@/views/home/FeedsList'
import Profile from '@/views/home/Profile.vue'

export default {
  name: 'Home',
  components: { FeedsList, Profile },
  data () {
    return {
      feeds: [],
      feedItems: [],
      feedPage: 1,
      separatedFeeds: false,
      feedsLoaded: false,

      profileSheet: false,
      profileDialog: false
    }
  },
  mounted () {
    getFeeds(this, this.feedLinks)
  },
  computed: {
    ...mapState({
      feedLinks: 'feeds'
    })
  },
  methods: {
    ...mapActions(['addFeed', 'deleteFeed']),
    feedDelete (url) {
      this.deleteFeed(url)
      this.feeds = this.feeds.filter(feed => feed.feedUrl !== url)
      this.feedItems = this.feedItems.filter(item => item.feedUrl !== url)
    }
  }
}
</script>
