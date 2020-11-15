<template>
  <div id="app">
    <a
      class="source"
      target="_blanc"
      href="https://github.com/anttiriski/reaktor-assingment"
    >
      <p>Source code on GitHub</p>
      <p
    /></a>
    <div class="nav">
      <router-link class="button" to="/jackets">
        <p class="iconText">Jackets</p>
        <img class="icon" src="./icons/jacket.svg" alt="Jacket" />
      </router-link>
      <router-link class="button" to="/shirts">
        <p class="iconText">Shirts</p>
        <img class="icon" src="./icons/shirt.svg" alt="Shirt" />
      </router-link>
      <router-link class="button" to="/accessories">
        <p class="iconText">Accessories</p>
        <img class="icon" src="./icons/watch.svg" alt="Watch" />
      </router-link>
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
#app {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.1rem;
}

.button {
  margin: 0 1.5rem;
  border: 2px solid black;
  padding: 0.6rem 1.2rem;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgba(92, 92, 92, 0.75);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  align-items: center;
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
  margin: 1rem 0rem;
}

.icon {
  height: 80px;
}

.source {
  text-align: center;
}

@media screen and (max-width: 770px) {
  .iconText {
    display: none;
  }
}
</style>
