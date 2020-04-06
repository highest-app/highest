<template>
  <div>
    <app-bar
      :title="$t('pages.profile')"
      small-only
      fixed/>
    <page-body>
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
          <!-- To un-comment when accounts will be available
          <template #action-text>{{ $t('profile.login') }}</template>
          <template #action>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </template>
          -->
        </card>
      </list-group>
      <list-group>
        <card-header>{{ $t('settings.adjustments') }}</card-header>
        <card
          to="/settings"
          top
          bottom>
          <template #title>{{ $t('pages.settings') }}</template>
          <template #action>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </template>
        </card>
      </list-group>
    </page-body>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>
