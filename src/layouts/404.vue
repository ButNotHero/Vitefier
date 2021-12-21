<script setup lang="ts"></script>

<template lang="pug">
.error-layout.layout
  Header
  main
    router-view(v-slot='{ Component }')
      component(:is='Component')
    div
      router-link.btn.mt-8.text-blue-500(:to='{ name: "home" }') На главную
  Footer
</template>

<style scoped lang="scss">
.error-layout {
  @apply dark:bg-black/70;
}
</style>
