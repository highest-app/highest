<template>
  <responsive-dialog v-model="enabled">
    <template #activator="{ on }">
      <card v-on="on">
        <template #title>{{ $t('terms.picture') }}</template>
        <template #action-text>{{ $t('terms.select') }}</template>
        <template #action>
          <v-list-item-icon v-if="id === ''">
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
          <v-list-item-avatar v-else>
            <v-img :src="blob"/>
          </v-list-item-avatar>
        </template>
      </card>
    </template>
    <template #dialog>
      <app-bar
        :title="$t('assets.add')"
        small-only
        fixed>
        <template #bar-right-actions>
          <a @click="upload">{{ $t('terms.ok') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col cols="12">
            <strong>{{ $t('assets.uploadHelper') }}</strong>
            <list-group>
              <card>
                <template #title>{{ $t('terms.picture') }}</template>
                <template #input>
                  <v-file-input
                    v-model="file"
                    :placeholder="$t('terms.picturePlaceholder')"
                    prepend-icon=""
                    hide-details
                    solo
                    flat
                    @change="update"/>
                </template>
              </card>
            </list-group>
            <v-img
              v-if="uploadBlob !== ''"
              :src="uploadBlob"/>
          </v-col>
          <v-col cols="12">
            <strong>{{ $t('assets.existingHelper') }}</strong>
            <v-row>
              <v-col
                v-for="(asset, id) in assets"
                :key="asset"
                cols="12"
                md="6"
                sm="4"
                lg="3"
                xl="2">
                <v-img
                  v-ripple
                  :src="asset"
                  @click="choose(id)"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AssetUploader',
  model: {
    prop: 'id'
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      file: '',
      uploadBlob: '',
      blob: '',
      enabled: false
    }
  },
  computed: mapState(['assets']),
  methods: {
    ...mapActions(['addAsset']),
    update () {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.uploadBlob = e.target.result
      }
      reader.readAsDataURL(this.file)
    },
    async upload () {
      let id = await this.addAsset(this.uploadBlob)
      this.$emit('input', id)
      this.enabled = false
    },
    choose(id) {
      this.$emit('input', id)
      this.blob = this.assets[id]
      this.enabled = false
    }
  }
}
</script>
