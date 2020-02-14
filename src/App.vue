<template>
  <div>
    <Nav />
    <div class="container">
      <div class="col align-self-center">
        <div id="app" class="m-2">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
export default {
  name: "App",
  components: {
    Nav
  }
};
</script>

