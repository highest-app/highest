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
              <v-switch
                v-model="separatedFeeds"
                :label="$t('home.separatedFeeds')"
                inset/>
              <template v-if="separatedFeeds">
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
import { mapGetters } from 'vuex'
import { dateToText } from '@/utils/parsing'
import { getFeeds } from '@/utils/feeds'
import FeedsList from '@/views/parts/FeedsList'
import Profile from '@/views/parts/Profile.vue'

export default {
  name: 'Home',
  components: { FeedsList, Profile },
  data () {
    return {
      feeds: [],
      feedItems: [],
      feedPage: 1,
      separatedFeeds: false,

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
