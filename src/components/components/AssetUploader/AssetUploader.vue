<template>
  <div class="asset-uploader__container">
    <slot
      name="activator"
      v-bind:on="events"/>
    <v-slide-x-reverse-transition>
      <panel
        v-if="active"
        :hook="$parent.$refs.content"
        page>
        <app-bar
          :title="$t(title)"
          small-only
          fixed>
          <template #bar-right-actions>
            <app-link @click="active = false">{{ $t('terms.actions.ok') }}</app-link>
          </template>
        </app-bar>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <strong>{{ $t('assets.help.upload') }}</strong>
              <list-group>
                <card
                  top
                  bottom>
                  <template #title>{{ $t('terms.fields.picture') }}</template>
                  <template #input>
                    <v-file-input
                      v-model="file"
                      prepend-icon=""
                      hide-details
                      solo
                      flat
                      @change="updatePreview"/>
                  </template>
                </card>
              </list-group>
              <template v-if="uploadBlob !== ''">
                <v-img :src="uploadBlob"/>
                <v-btn
                  class="gradient--primary"
                  block
                  @click="upload">
                  Upload
                </v-btn>
              </template>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <strong>{{ $t('assets.help.selectExisting') }}</strong>
              <v-item-group
                v-model="selectedIds"
                :multiple="multiple"
                @change="setSelection">
                <v-row>
                  <v-item
                    v-for="asset in assets"
                    :key="asset"
                    #default="{ active, toggle }">
                    <v-col
                      cols="12"
                      md="6"
                      sm="4"
                      lg="3"
                      @click="toggle">
                      <v-img
                        v-ripple
                        :src="asset"
                        width="300">
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center">
                          <v-icon v-if="active">mdi-check-circle-outline</v-icon>
                        </v-row>
                      </v-img>
                    </v-col>
                  </v-item>
                </v-row>
              </v-item-group>
            </v-col>
          </v-row>
        </v-container>
      </panel>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AssetUploader',
  model: {
    prop: 'selectedImages'
  },
  props: {
    selectedImages: Array,
    multiple: Boolean,
    title: {
      type: String,
      default: 'assets.edit'
    },
  },
  data () {
    return {
      file: undefined,
      uploadBlob: '',
      selectedIds: [],

      active: false,

      events: {
        click: this.enable
      }
    }
  },
  mounted() {
    for (let value of this.selectedImages) {
      const keys = Object.keys(this.assets)
      const index = keys.indexOf(value)
      this.selectedIds.push(index)
    }
  },
  computed: mapState(['assets']),
  methods: {
    ...mapActions(['addAsset', 'removeAsset']),
    enable() {
      this.active = true
    },
    updatePreview() {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.uploadBlob = e.target.result
      }
      reader.readAsDataURL(this.file)
    },
    async upload() {
      await this.addAsset(this.uploadBlob)
      this.file = ''
      this.uploadBlob = ''
    },
    setSelection() {
      let selected = []
      this.selectedIds.forEach(id => {
        const urls = Object.keys(this.assets)
        selected.push(urls[id])
      })
      this.$emit('input', selected)
    }
  }
}
</script>
