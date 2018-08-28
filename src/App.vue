<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">Transfer </router-link>
        <router-link to="/ConfirmTransaction">Confirm transactions</router-link>
        <router-link to="/Transactions">Transactions</router-link>
        <router-link to="/Login">Login</router-link>
    </div>
    <div class="columns is-fullheight is-hidden-mobile is-centered">
      <router-view/>
    </div>
  </div>
</template>

<script>

</script>

<style>
#app {
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {}

#nav a.router-link-exact-active  {
  color: #2c3e50;
}

#nav a {
  margin-left: 1.5rem;
  font-weight: bold;
  color: hsl(141, 71%, 48%);
}

.columns {
  padding-top: 3rem;
}

.card {
  width: 30rem;
}
</style>
