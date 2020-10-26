<template>
  <v-col
    :class="{ background }"
    cols="12"
    :md="half ? 6 : 12">
    <v-card
      elevation="0"
      style="border-radius: 14px">
      <v-card-text>
        <v-row
          v-if="title !== undefined"
          class="ma-0">
          <router-link
            class="text-h6 text--primary mb-1"
            :to="route">
            <v-icon
              v-if="icon"
              left>
              {{ icon }}
            </v-icon>
            {{ $t(title) }}
          </router-link>
          <v-spacer/>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                icon
                @click="reduce = !reduce"
                v-on="on">
                <v-icon>
                  {{ reduce ? 'mdi-chevron-right' : 'mdi-chevron-down' }}
                </v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t(reduce ? 'widgets.develop' : 'widgets.reduce') }}
            </span>
          </v-tooltip>
        </v-row>
        <template v-if="!reduce">
          <slot/>
        </template>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    background: Boolean,
    half: Boolean,

    title: String,
    icon: String,
    route: String
  },
  data() {
    return {
      reduce: false
    }
  }
}
</script>
