<template>
  <div>
    <responsive-dialog
      v-model="enabled"
      dialog-height="80vh">
      <template #dialog>
        <app-bar
          :title="$t(`profile.${active.name}`)"
          small-only
          sticky>
          <template #bar-right-actions>
            <app-link
              bold
              @click="enabled = false">
              {{ $t('terms.actions.ok') }}
            </app-link>
          </template>
        </app-bar>
        <component :is="active.component"/>
      </template>
    </responsive-dialog>
    <v-menu style="width: 250px">
      <template #activator="{ on: menu, attrs }">
        <v-tooltip
          open-delay="500"
          bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              :aria-label="$t('profile.title')"
              class="gradient--secondary"
              elevation="0"
              fab
              small
              v-bind="attrs"
              v-on="{ ...menu, ...tooltip }">
              <v-icon color="white">mdi-account-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('profile.title') }}</span>
        </v-tooltip>
      </template>
      <v-card
        class="sheet-background"
        style="border-radius: 12px">
        <list-group>
          <card
            top
            bottom>
            <template #avatar>
              <v-avatar class="gradient--secondary my-1">
                <v-icon color="white">mdi-account-outline</v-icon>
              </v-avatar>
            </template>
            <template #title>{{ $t('profile.user') }}</template>
            <!--To un-comment when accounts will be available
            <template #action-text>{{ $t('profile.login') }}</template>
            <template #action>
              <v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </template>-->
          </card>
        </list-group>
        <list-group
          v-for="(category, categoryIndex) in categories"
          :key="category.name">
          <card
            v-for="(tab, tabIndex) in category.tabs"
            :key="tab.name"
            :icon="tab.icon"
            :top="tabIndex === 0"
            :bottom="tabIndex === category.tabs.length - 1"
            chevron
            @click="activateTab(categoryIndex, tabIndex)">
            <template #title>{{ $t(`profile.${tab.name}`) }}</template>
          </card>
        </list-group>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import AssetsManaging from '@/views/home/AssetsManaging'
import TagsManaging from '@/views/home/TagsManaging'
import Settings from '@/views/home/Settings'

export default {
  name: 'Profile',
  data() {
    return {
      enabled: false,
      categories: [
        {
          name: 'customisation',
          tabs: [
            {
              name: 'tags',
              icon: 'mdi-tag-outline',
              active: false,
              component: TagsManaging
            }
          ]
        },
        {
          name: 'adjustments',
          tabs: [
            {
              name: 'assets',
              icon: 'mdi-image-outline',
              active: false,
              component: AssetsManaging
            },
            {
              name: 'settings',
              icon: 'mdi-cog-outline',
              active: false,
              component: Settings
            }
          ]
        }
      ],
      activeCategory: 0,
      activeTab: 0
    }
  },
  methods: {
    activateTab(category, tab) {
      this.activeCategory = category
      this.activeTab = tab
      this.enabled = true
    }
  },
  computed: {
    active() {
      return this.categories[this.activeCategory].tabs[this.activeTab]
    }
  }
}
</script>
