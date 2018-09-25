<template>
  <div id="app">
    <div id="nav" class="has-text-centered">
      <router-link to="/Balance">Balance</router-link>
      <router-link to="/">Transfer</router-link>
      <router-link to="/Transactions">Transactions</router-link>
      <!-- <router-link to="/Login">Login</router-link> -->
    </div>
    <div class="columns is-fullheight is-hidden-mobile is-centered">
      <nuxt/>
    </div>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

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

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

