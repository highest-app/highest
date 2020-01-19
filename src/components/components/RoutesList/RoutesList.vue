<template>
  <v-list class="background">
    <v-list-item v-if="routes.length === 0">
      Aucune voie pour le moment. Ajoutez-en une !
    </v-list-item>
    <template v-for="(route, i) in routes">
      <v-list-item
        :key="`${route.id}--list-item`"
        no-action>
        <div class="v-list-item__icon v-list-group__header__prepend-icon">
          <v-icon :color="icons.get(route).color">{{ icons.get(route).icon }}</v-icon>
        </div>
        <v-list-item-content>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
          <v-list-item-subtitle>
            <span class="text--primary">{{ route.grade }}</span>
            &mdash; {{ route.goal ? `Objectif : ${dateToText(route.goal)}` : 'Aucun objectif' }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            :ripple="false"
            icon
            :to="`/locations/${route.location}/${route.id}`">
            <v-icon color="primary">mdi-information-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider
        v-if="i !== routes.length - 1"
        :key="`${route.id}--divider`"
        inset/>
    </template>
  </v-list>
</template>

<script>
import { routeIcons } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'RoutesList',
  props: {
    routes: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    icons: routeIcons
  }),
  methods: {
    dateToText
  }
}
</script>
