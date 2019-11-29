<template>
  <v-card>
    <v-list>
      <v-list-group
        prepend-icon="mdi-plus"
        :value="false">
        <template v-slot:activator>
          <v-list-item-title>{{ label }}</v-list-item-title>
        </template>

        <v-list-item>
          <slot/>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AddingMenu',
  props: {
    label: {
      type: String,
      default: 'Ajouter'
    }
  }
}
</script>
