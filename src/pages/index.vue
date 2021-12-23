<script setup lang="ts">
import { useRootStore } from '@/stores/_root';
import { useDevice } from '@/use/_root';

const rootStore = useRootStore();
const { t } = useI18n();
const isPC = ref(false);
const isMobile = ref(false);

onMounted(() => {
  isPC.value = useDevice().isPC;
  isMobile.value = useDevice().isMobile;
});
</script>

<template lang="pug">
.home
  .home__container.container-px
    h1.home__title {{ t('home') }}
    p.home__text Your device is PC: {{ isPC }}
    p.home__text Your device is mobile: {{ isMobile }}
    p.home__text {{ t('helpText') }}
    .home__wrap.mt-10
      p.home__text Count: {{ rootStore.count }}
      button.mt-4.bg-gray-200.px-10px.py-4px(@click='rootStore.increase()') Increase count
    button.mt-4.bg-gray-200.px-10px.py-4px(@click='rootStore.resetState()') Reset count store
</template>

<route lang="yml">
{ name: home, meta: { middlewares: [auth] } }
</route>
