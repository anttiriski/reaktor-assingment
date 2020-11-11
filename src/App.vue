<template>
  <div id="app">
    <div class="nav">
      <router-link class="button" to="/jackets">Jackets</router-link>
      <router-link class="button" to="/shirts">Shirts</router-link>
      <router-link class="button" to="/accessories">Accessories</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.button {
  margin: 0 2rem;
  border: 2px solid black;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgba(92, 92, 92, 0.75);
  text-decoration: none;
}

.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0px 0px black;
}

.router-link-active {
  background-color: rgb(159, 231, 255);
}

.nav {
  margin-top: 2rem;
  justify-content: center;
  display: flex;
}
</style>
