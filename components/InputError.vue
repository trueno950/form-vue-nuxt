<template>
  <div class="input-errors">
    <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errorMessage: String,
});
props.errorMessage;
</script>

<style scoped>
.input-errors {
  margin-top: 0.25rem;
}
</style>
