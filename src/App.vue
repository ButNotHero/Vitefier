<script setup lang="ts">
import { useTheme, useLocale } from '@/use/_root';

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
</script>

<template lang="pug">
router-view
</template>
