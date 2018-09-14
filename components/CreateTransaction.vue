<template>
  <div>
    <div class="is-size-5">
      <p class="p-transfer">Transfer VTX</p>
    </div>
    <div class="card">
    <div class="card-content has-text-left">
      <form @submit.prevent="transferVTX">
        <b-field label="Enter your Account ID*">
          <b-input v-model="from.fromAccountID" placeholder="Account ID" required expanded/>
        </b-field>
        <b-field label="Enter your user public key">
          <b-input v-model="from.fromWallet" placeholder="Enter your user public key" expanded type="text"/>
        </b-field>
        <b-field label="Enter recipient's Account ID*">
          <b-input v-model="to.toAccountID" placeholder="Recipient's Account ID " required expanded type="text"/>
        </b-field>
        <b-field label="Enter recipient's user public key">
          <b-input v-model="to.toWallet" placeholder="Recipient's user public key" expanded type="text"/>
        </b-field>
        <b-field label="VTX*">
          <b-input v-model="amount" placeholder="VTX number to transfer" required expanded type="text"/>
        </b-field>
        <b-field label="Add Note">
          <b-input v-model="transferNote" type="textarea" placeholder="Type a message to the recipient"></b-input>
        </b-field>
        <p class="control">
          <button class="button is-success">Send</button>
        </p>
      </form>
    </div>
    <b-modal :active.sync="isModalActive" has-modal-card>
      <div class="card">
        <div class="card-header is-size-5">
          <p>
            Transfer
          </p>
        </div>
        <div class="card-content">
          <p>
            {{ transferMessage }}
          </p>
        </div>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script>
require("dotenv").config();
import Ledger from '../static/ledger.js';
const httpEndpoint = process.env.HTTP_ENDPOINT;
const chainId = process.env.CHAIN_ID;
const keyProvider = process.env.KEY_PROVIDER;
//console.log(httpEndpoint, chainId, keyProvider)

const ledger = new Ledger({
  httpEndpoint: httpEndpoint,
  chainId: chainId,
  keyProvider: keyProvider
});
export default {
  data() {
    const data = {
      from: {
        fromAccountID: "",
        fromWallet: ""
      },
      to: {
        toAccountID: "",
        toWallet: ""
      },
      amount: 0,
      transferNote: "",
      transferMessage: "",
      isModalActive: false,
      //balance: 0
    }
    return data;
  },
  methods: {
    async transferVTX() {
      if (this.balance > this.amount) {
        const result = await ledger.recordTransfer({
          from: {
            account: this.from.fromAccountID,
            wallet: this.from.fromWallet
          },
          to: {
            account: this.to.toAccountID,
            wallet: this.to.toWallet
          },
          amount: this.amount
        });
        this.isModalActive = true;
        this.transferMessage = `You transfered ${result.amount} VTX from account ${result.from.account} to account ${result.to.account}`
      } else {
        this.isModalActive = true;
        this.transferMessage = `Balance is not enough to make this transfer`
      }
    }
  }
}
</script>

<style>
.card {
  width: 30rem;
  margin-top:1rem;
}
.p-transfer {
  margin-top: 1rem;
}
input:focus {
  border-color:aqua;
}
</style>
