<template>
  <page-body>
    <p>{{ $t('assets.help.description') }}</p>
    <v-row>
      <template v-if="Object.keys(assets).length">
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
                :aria-label="$t('assets.remove')"
                icon
                @click="() => { removeAsset(id); $forceUpdate() }">
                <v-icon color="error">mdi-delete-outline</v-icon>
              </v-btn>
            </v-row>
          </v-img>
        </v-col>
      </template>
      <illustration
        v-else
        image="/img/illustrations/image-folder.svg"
        label="assets.any"/>
    </v-row>
  </page-body>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AssetsManaging',
  computed: mapState(['assets']),
  methods: mapActions(['removeAsset'])
}
</script>
