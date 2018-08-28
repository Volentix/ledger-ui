<template>
  <div class="card">
    <header class="card-header has-text-centered">
      <p class="has-text-centered is-size-5">
        Your balance
      </p>
    </header>
    <div class="level has-text-centered">
      <div class="level-item is-size-4">
        <span>{{ currency }}</span>
      </div>
      <div class="level-item is-size-4">
        {{ balance }}
      </div>
    </div>
  </div>
</template>

<script>
import Ledger from '../assets/mock-ledger.js';
let ledger = new Ledger();
let transferDetails = {
  from: "fromAcc",
  to: "toAcc",
  amount: 10
}

export default {
  data() {
    const data = {
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
      const userBalance = await ledger.retrieveBalance({
        account: "EOS6Ew693sd741xNhBPGaa72cujaaMByyJ7UBpWR5c9QnCsVcRuP4",       // the ID of an account
        key: "EOS5vBqi8YSzFCeTv4weRTwBzVkGCY5PN5Hm1Gp3133m8g9MtHTbW"            // the public key of an EOS wallet
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