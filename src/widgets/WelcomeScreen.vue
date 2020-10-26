<template>
  <widget>
    <div class="subtitle-1 list-description--text">{{ $t('home.appSubtitle') }}</div>
    <img
      width="50%"
      src="/img/logo-large.png"
      alt="Highest logo">
    <div class="text--primary text-body-1">{{ $t('home.appDescription') }}</div>
  </widget>
</template>

<script>
import Widget from '@/widgets/Widget'

export default {
  name: 'WelcomeScreen',
  components: { Widget }
}
</script>