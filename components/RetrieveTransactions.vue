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
          {{ props.row.fromAccount }}
        </b-table-column>
        <!-- <b-table-column label="From Key" class="has-text-centered" field="fromAccount">
          {{ props.row.fromKey }}
        </b-table-column> -->
        <b-table-column label="To" class="has-text-centered" field="toAccount">
          {{ props.row.toAccount }}
        </b-table-column>
        <!-- <b-table-column label="To Key" class="has-text-centered" field="toAccount">
          {{ props.row.sToKey }}
        </b-table-column> -->
        <b-table-column label="Amount" class="has-text-centered" field="vtx">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column label="Comment" class="has-text-centered" field="comment">
          {{ props.row.comment }}
        </b-table-column>
        <b-table-column label="To Key" class="has-text-centered" field="nonce">
          {{ props.row.sToKey }}
        </b-table-column>
      </template>
    </b-table>
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
export default {
  data() {
    const data = {
      transactions: [
        {
          s: "",
          key: 0,
          Id: 0,
          sToKey: "",
          fromAccount: "",
          toAccount: "",
          fromKey: "",
          currency: "",
          amount: 0,
          comment: "",
          nonce: ""
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
        account: "",       // the ID of an account
        wallet: "",            // the public key of an EOS wallet
        limit: 10
      });
      this.transactions = userTransactions.output1;
      //this.transactions = userTransactions.transactions;
      console.log(userTransactions.output1);
    }
  }
}
</script>

<style>
p {
  margin-bottom: 2rem;
}
</style>