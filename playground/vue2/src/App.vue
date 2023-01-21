<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Logo from './components/Logo'
</script>

<template>
  <div id="app">
    <header>
      <Logo />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>
  </div>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
