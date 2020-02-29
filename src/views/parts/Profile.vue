<template>
  <v-card class="background">
    <v-card-text
      class="pa-0"
      style="overflow-x: hidden;">
      <app-bar
        :title="$t('pages.profile')"
        small-only
        fixed>
        <template #bar-right-actions>
          <a @click="$emit('close')">{{ $t('terms.close') }}</a>
        </template>
      </app-bar>
      <page-body>
        <list-group>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>

</style>