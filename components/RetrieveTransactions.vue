<template>
  <div class="has-text-centered">
    <div class="select_account">
      <form @submit.prevent="retrieveTransactions">
        <b-field label="Choose an account">
          <b-input v-model="selectedAccount" placeholder="Account" expanded type="text"/>
        </b-field>
        <b-field label="Choose a wallet">
          <b-input v-model="selectedWallet" placeholder="Wallet" expanded type="text"/>
        </b-field>
        <b-field label="Limit">
          <b-input v-model="transactionsLimit" placeholder="Limit" expanded type="text"/>
        </b-field>
        <p class="control">
          <button class="button is-success">Retrieve transactions</button>
        </p>
      </form>
    </div>
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
  props: {
    perPage: {
      type: Number,
      default: 5
    },
    paginated: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: undefined
    }
  },
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
          amount: null,
          comment: "",
          nonce: ""
        }
      ],
      selectedAccount: "",
      selectedWallet: "",
      transactionsLimit: 10
    };
    return data;
  },
  methods: {
    async retrieveTransactions() {
      const userTransactions = await ledger.retrieveTransactions({
        account: this.selectedAccount,       // the ID of an account
        wallet: this.selectedWallet,            // the public key of an EOS wallet
        limit: this.transactionsLimit
      });
      this.transactions = userTransactions.output1;
    }
  }
}
</script>

<style>
p {
  margin-bottom: 2rem;
}
.select_account {
  width: 25rem;
  margin: 0 auto;
}
</style>