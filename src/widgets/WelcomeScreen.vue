<template>
  <widget>
    <div>{{ $t('home.appSubtitle') }}</div>
    <img
      width="50%"
      src="/img/logo-large.png"
      alt="Highest logo">
    <div class="text--primary">{{ $t('home.appDescription') }}</div>
  </widget>
</template>

<script>
import Widget from '@/widgets/Widget'

export default {
  name: 'WelcomeScreen',
  components: { Widget }
}
</script>