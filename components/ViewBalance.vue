<template>
  <div>
    <form @submit.prevent="getBalance">
      <b-field label="Choose an account">
        <b-input v-model="account" placeholder="Account" expanded type="text"/>
      </b-field>
      <b-field label="Choose a wallet">
        <b-input v-model="wallet" placeholder="Wallet" expanded type="text"/>
      </b-field>
      <p class="control">
        <button class="button is-success">Get balance</button>
      </p>
    </form>
    <div class="card">
      <header class="card-header has-text-centered">
        <p class="has-text-centered is-size-5">
          Your balance
        </p>
      </header>
      <div class="level has-text-centered">
        <div class="level-item is-size-4">
          <span>{{ currency }} </span>
        </div>
        <div class="level-item is-size-4">
          <span> {{ balance }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ledger from '../ledger.js';

const httpEndpoint = process.env.HTTP_ENDPOINT;
const chainId = process.env.CHAIN_ID;
const keyProvider = process.env.KEY_PROVIDER;

const ledger = new Ledger({
  httpEndpoint: httpEndpoint,
  chainId: chainId,
  keyProvider: keyProvider
});
// console.log(httpEndpoint);
export default {
  data() {
    let data = {
      account: "",
      wallet: "",
      balance: 0,
      currency: ""
    }
  return data;
  },
  // mounted() {
  //   this.getBalance();
  // },
  methods: {
    async getBalance() {
      //console.log("Retrieving balance");
      const userBalance = await ledger.retrieveBalance({
        account: this.account,       // the ID of an account
        wallet: this.wallet            // the public key of an EOS wallet
      });
      this.balance = userBalance.amount;
      this.currency = userBalance.currency;
    }
  }
}
</script>

<style>
.card {
  /* margin-top: 3rem; */
}
.card .level{
  padding: 1rem;
}
.card-header {
  padding: 1rem;
}
.card-header p {
  width: 100%;
}
</style>