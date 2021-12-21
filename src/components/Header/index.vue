<script setup lang="ts">
import { useLocale } from '@/use/useLocale';
import { useTheme } from '@/use/useTheme';

const locale = useLocale();
const theme = useTheme();
</script>

<template lang="pug">
header.header
  .header__container.container-px
    h1 Header
    button(@click='theme.toggleDark()') Toggle theme
    ul
      li(@click='locale.toggleLocale("ru")')
        button Русский
      li(@click='locale.toggleLocale("en")')
        button English
</template>

<style scoped lang="scss">
.header {
  @include header-border();
  @apply py-0;

  &__container {
    @apply flex justify-between items-center;
  }
}
</style>
