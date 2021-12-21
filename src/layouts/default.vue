<template lang="pug">
.default-layout.layout
  Header
  main.default-layout__main
    router-view(v-slot='{ Component }')
      component(:is='Component')
  Footer
</template>

<style scoped lang="scss">
.default-layout {
  @apply dark:bg-black/70;
}
</style>
