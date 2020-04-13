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
          <a @click="add">{{ $t('terms.add') }}</a>
        </template>
      </app-bar>
      <page-body>
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
          v-if="blob !== ''"
          :src="blob"/>
      </page-body>
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
      blob: '',
      enabled: false
    }
  },
  methods: {
    ...mapState(['assets']),
    ...mapActions(['addAsset']),
    update () {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.blob = e.target.result
      }
      reader.readAsDataURL(this.file)
    },
    add () {
      this.addAsset(this.blob).then((id) => {
        this.$emit('input', id)
      })
      this.enabled = false
    }
  }
}
</script>
