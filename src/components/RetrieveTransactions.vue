<template>
  <div>
    <div class="has-text-centered is-size-5">
      <p>
      Transactions history
      </p>
    </div>
    <b-table :data="transactions" class="is-fullwidth" striped is-narrow bordered is-fullwidth>
      <template slot-scope="props">
        <b-table-column label="From" class="has-text-centered" field="fromAccount">
          {{ props.row.from }}
        </b-table-column>
        <b-table-column label="To" class="has-text-centered" field="toAccount">
          {{ props.row.to.account }}
        </b-table-column>
        <b-table-column label="Amount" class="has-text-centered" field="vtx">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column label="Currency" class="has-text-centered" field="status">
          {{ props.row.currency }}
        </b-table-column>
        <b-table-column label="Status" class="has-text-centered" field="status">
          {{ props.row.status }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>


<script>
import Ledger from '../assets/mock-ledger.js';
let ledger = new Ledger();
export default {
  data() {
    const data = {
      transactions: [
        {
          from: "",
          to: {
            account: "",
            wallet: ""
          },
          currency: "",
          amount: 0,
          date: ""
        }
      ]
    };
    return data;
  },
  mounted() {
    this.retrieveTransactions();
  },
  methods: {
    async retrieveTransactions() {
      const userTransactions = await ledger.retrieveTransactions({
        account: "EOS6Ew693sd741xNhBPGaa72cujaaMByyJ7UBpWR5c9QnCsVcRuP4",       // the ID of an account
        key: "EOS5vBqi8YSzFCeTv4weRTwBzVkGCY5PN5Hm1Gp3133m8g9MtHTbW"            // the public key of an EOS wallet
      });
      this.transactions = userTransactions.transactions;
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 2rem;
}
</style>