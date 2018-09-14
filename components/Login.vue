<template>
  <div>
    <div class="is-size-5">
      <p>Login</p>
    </div>
    <br>
    <div class="card">
      <div class="card-content has-text-left">
        <form>
          <b-field label="Enter your Account ID">
            <b-input placeholder="Account ID" required expanded/>
          </b-field>
          <b-field label="Enter your password">
            <b-input placeholder="Password" required expanded type="text"/>
          </b-field>
          <p class="control">
            <button class="button is-success">Login</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>