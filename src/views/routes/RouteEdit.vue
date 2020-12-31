<template>
  <responsive-dialog v-model="dialog">
    <template #activator="{ on }">
      <slot
        name="activator"
        v-bind:on="on"/>
    </template>
    <template #dialog>
      <popup
        v-model="removePopup"
        right-text="terms.actions.remove"
        critical
        @right-action="remove">
        <template #description>{{ $t('routes.actions.removeConfirmation') }}</template>
      </popup>
      <app-bar
        :title="$t('routes.actions.edit')"
        small-only
        fixed>
        <template #bar-left-actions>
          <app-link @click="quit">{{ $t('terms.actions.cancel') }}</app-link>
        </template>
        <template #bar-right-actions>
          <app-link @click="validate">{{ $t('terms.actions.ok') }}</app-link>
        </template>
      </app-bar>
      <route-form
        v-model="routeForm"
        dialog/>
      <page-body>
        <div class="px-4">
          <asset-uploader
            v-model="routeForm.photos"
            :active="photoChoose"
            title="routes.actions.editAssets"
            multiple>
            <template #activator="{ on }">
              <v-card v-on="on">
                <v-img :src="getRouteThumbnail(route)">
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
            </template>
          </asset-uploader>
        </div>
        <div class="mt-4">
          <card-group>
            <responsive-dialog
              v-if="transferableLocations.length"
              v-model="transferDialog">
              <template #activator="{ on }">
                <card
                  top
                  v-on="on">
                  <template #title>
                    <span class="primary--text">{{ $t('routes.actions.transfer') }}</span>
                  </template>
                </card>
              </template>
              <template #dialog>
                <app-bar
                  :title="$t('routes.actions.transfer')"
                  small-only
                  fixed>
                  <template #bar-left-actions>
                    <app-link @click="transferDialog = false">{{ $t('terms.actions.cancel') }}</app-link>
                  </template>
                </app-bar>
                <page-body>
                  <card-group>
                    <card
                      v-for="(location, i) in transferableLocations"
                      :key="location.id"
                      :top="i === 0"
                      :bottom="i === transferableLocations.length - 1"
                      @click="transferRoute({
                        location: location.id,
                        route: route.id,
                        $router
                      })">
                      <template #title>
                        <v-list-item-avatar>
                          <v-img :src="getLocationThumbnail(location)"/>
                        </v-list-item-avatar>
                        {{ location.name }}
                      </template>
                    </card>
                  </card-group>
                </page-body>
              </template>
            </responsive-dialog>
            <card
              :top="!transferableLocations.length"
              bottom
              @click="removePopup = true">
              <template #title>
                <span class="error--text">{{ $t('routes.actions.remove') }}</span>
              </template>
            </card>
          </card-group>
        </div>
      </page-body>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import RouteForm from '@/views/routes/RouteForm'
import { getRouteThumbnail, getLocationThumbnail } from '@/utils/assets'

export default {
  name: 'RouteEdit',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Boolean,
    route: {
      type: Object,
      default: () => {}
    },
    solo: Boolean
  },
  components: { RouteForm },
  data() {
    return {
      dialog: false,
      photoChoose: false,
      transferDialog: false,
      removePopup: false,

      routeForm: {}
    }
  },
  mounted() {
    this.quit()
  },
  computed: {
    ...mapState(['locations']),
    transferableLocations() {
      return this.locations.filter(location => location.id !== this.route.location)
    }
  },
  methods: {
    ...mapActions(['updateRoute', 'transferRoute', 'removeRoute']),
    getRouteThumbnail, getLocationThumbnail,
    validate() {
      this.updateRoute(this.routeForm)
      this.quit()
    },
    remove() {
      this.removeRoute(this.route.id)
      if (!this.solo) this.$router.back()
      this.quit()
    },
    resetForm(route) {
      this.routeForm = Object.assign({
        enableGoal: route.goal !== false
      }, route)
    },
    quit() {
      this.resetForm(this.route)
      this.dialog = false
    }
  },
  watch: {
    dialog(value) {
      this.$emit('change', value)
    },
    active(value) {
      this.dialog = value
    },
    route(value) {
      this.resetForm(value)
    }
  }
}
</script>
