<template>
  <div class="asset-uploader__container">
    <v-card @click="enable">
      <v-img :src="previewImage">
        <v-row
          style="flex-direction: column"
          class="fill-height blurred"
          align="center"
          justify="center">
          <v-icon size="70">mdi-image-edit-outline</v-icon>
          <span class="headline">{{ $t('assets.edit') }}</span>
        </v-row>
      </v-img>
    </v-card>
    <v-slide-x-reverse-transition>
      <panel
        v-if="active"
        :hook="$parent.$refs.main"
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
              <v-form
                ref="form"
                v-model="valid">
                <strong>{{ $t('assets.help.uploadNew') }}</strong>
                <card-group>
                  <card
                    v-if="url === ''"
                    icon="mdi-file-image-outline"
                    icon-color="teal"
                    top>
                    <template #title>{{ $t('terms.fields.file') }}</template>
                    <template #input>
                      <v-file-input
                        v-model="file"
                        :rules="rules"
                        :placeholder="$t('assets.help.types')"
                        :accept="types.join(', ')"
                        prepend-icon=""
                        hide-details
                        solo
                        flat
                        @change="updatePreview"/>
                    </template>
                    <template
                      v-if="!valid && file !== undefined"
                      #description>
                      <span class="error--text">{{ $t('assets.errors.wrongType') }}</span>
                    </template>
                  </card>
                  <card
                    v-if="file === undefined"
                    :bottom="valid || file === undefined"
                    icon="mdi-link-variant"
                    icon-color="light-green">
                    <template #title>{{ $t('terms.fields.url' )}}</template>
                    <template #input>
                      <v-text-field
                        v-model="url"
                        placeholder="https://..."
                        type="url"
                        hide-details
                        clearable
                        solo
                        flat
                        @click:clear="url = ''"/>
                    </template>
                  </card>
                  <card
                    v-if="(valid && file !== undefined) || url !== ''"
                    chevron
                    bottom
                    @click="upload">
                    <template #title>
                      <span class="primary--text">{{ $t('assets.help.upload') }}</span>
                    </template>
                  </card>
                </card-group>
                <v-img
                  v-if="(valid && file !== undefined) || url !== ''"
                  :src="file === undefined ? url : blob"
                  :alt="$t('assets.help.preview')"/>
                <span v-if="url !== ''">{{ $t('assets.help.url') }}</span>
              </v-form>
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
import Compressor from 'compressorjs'

export default {
  name: 'AssetUploader',
  model: {
    prop: 'selectedImages'
  },
  props: {
    selectedImages: Array,
    multiple: Boolean,
    previewImage: String,
    title: {
      type: String,
      default: 'assets.edit'
    }
  },
  data () {
    return {
      file: undefined,
      blob: '',
      selectedIds: [],
      types: ['image/png', 'image/jpeg', 'image/bpm', 'image/gif', 'image/svg+xml'],
      rules: [
        value => (value !== undefined && this.types.includes(value.type))  || this.$t('assets.errors.wrongType')
      ],
      url: '',
      valid: true,

      active: false
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
        this.blob = e.target.result
      }
      reader.readAsDataURL(this.file)
    },
    async upload() {
      let view = this

      if (this.file === undefined) {
        await this.addAsset(this.url)
        this.url = ''
        view.$refs.form.reset()
      } else {
        new Compressor(this.file, {
          quality: 0.4,
          async success(file) {
            let reader = new FileReader()
            reader.onload = async (e) => {
              await view.addAsset(e.target.result)
              view.file = ''
              view.blob = ''
              view.$refs.form.reset()
            }
            reader.readAsDataURL(file)
          }
        })
      }
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
