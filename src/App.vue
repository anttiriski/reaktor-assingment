<template>
  <div id="app">
    <div class="nav">
      <router-link class="button" to="/jackets">Jackets</router-link>
      <router-link class="button" to="/shirts">Shirts</router-link>
      <router-link class="button" to="/accessories">Accessories</router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.button {
  margin: 0 1.5rem;
  border: 2px solid black;
  padding: 1rem 2rem;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgba(92, 92, 92, 0.75);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
}

.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0px 0px black;
}

.router-link-active {
  background-color: rgb(255, 198, 112);
}

.nav {
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
}

#app {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.1rem;
}
</style>
