<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <PerformanceExpectationForm />
  </div>
</template>

<script>
import PerformanceExpectationForm from './components/PerformanceExpectationForm.vue';

export default {
  name: 'App',
  components: {
    PerformanceExpectationForm
  }
};
</script>
