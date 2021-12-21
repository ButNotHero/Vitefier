<script setup lang="ts">
import { useRootStore } from '@/stores/_root';

const rootStore = useRootStore();
const { t } = useI18n();
</script>

<template lang="pug">
.home
  .home__container.container-px
    h1.home__title {{ t('home') }}
    p.home__text {{ t('helpText') }}
    .home__wrap.mt-10
      p.home__text Count: {{ rootStore.count }}
      button.mt-4.bg-gray-200.px-10px.py-4px(@click='rootStore.increase()') Increase count
</template>

<route lang="yml">
{ name: home, meta: { middlewares: [auth] } }
</route>
