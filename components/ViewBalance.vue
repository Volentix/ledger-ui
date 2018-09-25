<template>
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
      balance: 0,
      currency: ""
    }
  return data;
  },
  mounted() {
    this.getBalance();
  },
  methods: {
    async getBalance() {
      //console.log("Retrieving balance");
      const userBalance = await ledger.retrieveBalance({
        account: "vtxtrust",       // the ID of an account
        wallet: ""            // the public key of an EOS wallet
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