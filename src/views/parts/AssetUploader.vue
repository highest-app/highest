<template>
  <responsive-dialog>
    <template #activator="{ on }">
      <card v-on="on">
        <template #title>{{ $t('terms.picture') }}</template>
        <template #description>
          {{ $t('terms.pictureDescription') }}
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
import { mapActions } from 'vuex'

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
      blob: ''
    }
  },
  methods: {
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
    }
  }
}
</script>
