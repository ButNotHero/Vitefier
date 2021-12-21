<script setup lang="ts">
useHead({
  title: '404',
});
</script>

<template lang="pug">
.container-px
  h1 404
</template>

<route lang="yml">
{ name: '404', meta: { layout: 404 } }
</route>
