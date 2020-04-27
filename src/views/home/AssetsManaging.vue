<template>
  <v-slide-x-reverse-transition>
    <panel
      v-if="enabled"
      :hook="$parent.$parent.$parent.$refs.dialog"
      disable-offset
      dialog>
      <app-bar
        :title="$t('assets.manage')"
        small-only
        sticky>
        <template #bar-left-actions>
          <a @click="$emit('change', false)">{{ $t('terms.actions.ok') }}</a>
        </template>
      </app-bar>
      <v-container>
        <p>{{ $t('assets.help.description') }}</p>
        <v-row>
          <v-col
            v-for="(asset, id) in assets"
            :key="asset"
            cols="12"
            md="6"
            sm="4"
            lg="3">
            <v-img
              :src="asset"
              width="300">
              <v-row class="mx-1">
                <v-spacer/>
                <v-btn
                  icon
                  @click="() => { removeAsset(id); $forceUpdate() }">
                  <v-icon color="error">mdi-delete-outline</v-icon>
                </v-btn>
              </v-row>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </panel>
  </v-slide-x-reverse-transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AssetsManaging',
  model: { prop: 'enabled', event: 'change' },
  props: {
    enabled: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState(['assets']),
  methods: mapActions(['removeAsset'])
}
</script>
