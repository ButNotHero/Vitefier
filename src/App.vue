<script setup lang="ts">
import { useTheme } from '@/use/_root/useTheme';
import { useLocale } from '@/use/_root/useLocale';

const theme = useTheme();
const locale = useLocale();

// https://github.com/vueuse/head
useHead({
  htmlAttrs: {
    lang: locale.getCurrentLocale,
  },
  title: 'SSR Title',
  meta: [{ name: 'description', content: 'Шаблон SSR' }],
});

// watch(theme.isDark, (v) => theme.watchCallback(v), {
//   immediate: true,
// });
</script>

<template lang="pug">
router-view
</template>
